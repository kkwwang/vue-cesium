import { ref } from 'vue'
import { VcViewerProvider } from '@vue-cesium/utils/types'
import { DrawStatus } from '@vue-cesium/shared'
import { PolylineDrawing } from '@vue-cesium/components/measurements/src/measure.types'
import useTimeout from '@vue-cesium/composables/private/use-timeout'

export default function (props, $services: VcViewerProvider, drawTipOpts, ctx) {
  // state
  const polylines = ref<Array<PolylineDrawing>>([])
  const drawStatus = ref(DrawStatus.BeforeDraw)
  const canShowDrawTip = ref(false)
  const drawTipPosition = ref<Array<number> | Cesium.Cartesian3>([0, 0, 0])
  const drawTip = ref('')
  const showEditor = ref(false)
  const editorPosition = ref<Array<number> | Cesium.Cartesian3>([0, 0, 0])
  const mouseoverPoint = ref<any>(null)
  const editingPoint = ref<any>(null)
  const { emit } = ctx
  let editorType = ''
  let lastClickPosition: Cesium.Cartesian2
  let restorePosition
  const { registerTimeout, removeTimeout } = useTimeout()

  const mouseDelta = 10
  // methods
  const startNew = () => {
    const polyline: PolylineDrawing = {
      positions: [],
      tempPositions: [],
      show: false,
      drawStatus: DrawStatus.BeforeDraw,
      loop: props.loop
    }

    polylines.value.push(polyline)
    canShowDrawTip.value = true
    drawTip.value = drawTipOpts.drawTip1
  }

  const stop = () => {
    if (drawStatus.value === DrawStatus.Drawing) {
      polylines.value.pop()
    }
    drawStatus.value = DrawStatus.BeforeDraw
    canShowDrawTip.value = false
    drawTipPosition.value = [0, 0, 0]
  }

  const handleMouseClick = (movement: Cesium.Cartesian2, options?) => {
    if (options.button === 2 && options.ctrl) {
      stop()
      return {
        windowPoistion: movement,
        finished: true
      }
    }

    if (drawStatus.value === DrawStatus.AfterDraw) {
      startNew()
    }

    const index = editingPoint.value ? editingPoint.value._vcPolylineIndx : polylines.value.length - 1
    const polyline: PolylineDrawing = polylines.value[index]
    const tempPositions = polyline.tempPositions
    const { viewer, getWorldPosition } = $services

    if (options.button === 2 && editingPoint.value) {
      drawStatus.value = DrawStatus.AfterDraw
      polyline.drawStatus = DrawStatus.AfterDraw
      polyline.positions[editingPoint.value._index] = restorePosition!
      editingPoint.value = undefined
      drawTip.value = drawTipOpts.drawTip1
      return {
        index: index,
        polylines: polylines,
        finished: true,
        position: restorePosition,
        windowPoistion: movement,
        type: editorType
      }
    }

    const { defined, Cartesian2 } = Cesium
    lastClickPosition = lastClickPosition || new Cesium.Cartesian2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)

    if (Cartesian2.magnitude(Cartesian2.subtract(lastClickPosition, movement, {} as any)) < mouseDelta) {
      return
    }

    if (options.button === 2 && drawStatus.value === DrawStatus.Drawing) {
      if (tempPositions.length > 1) {
        tempPositions.pop()
        handleMouseMove(movement)
      }
    }

    if (options.button !== 0) {
      return
    }

    const scene = viewer.scene
    const position = getWorldPosition(scene, movement, {} as any)
    let finished = false
    let type = 'new'
    if (defined(position)) {
      if (editingPoint.value) {
        drawStatus.value = DrawStatus.AfterDraw
        editingPoint.value = undefined
        finished = true
        type = editorType
        drawTip.value = drawTipOpts.drawTip1
      } else {
        tempPositions.push(position)

        polyline.positions = tempPositions
        polyline.show = true
        polyline.drawStatus = DrawStatus.Drawing
        drawStatus.value = DrawStatus.Drawing
        canShowDrawTip.value = true
        drawTip.value = drawTipOpts.drawTip2
      }

      Cartesian2.clone(movement, lastClickPosition)
      return {
        index: index,
        polylines: polylines,
        finished: finished,
        position: position,
        windowPoistion: movement,
        type: type
      }
    }
  }

  const handleMouseMove = (movement: Cesium.Cartesian2) => {
    const { viewer, getWorldPosition } = $services
    const scene = viewer.scene
    const position = getWorldPosition(scene, movement, {} as any)
    const { defined } = Cesium

    if (!defined(position)) {
      return
    }

    drawTipPosition.value = position

    if (drawStatus.value !== DrawStatus.Drawing) {
      return
    }

    const index = editingPoint.value ? editingPoint.value._vcPolylineIndx : polylines.value.length - 1
    const polyline: PolylineDrawing = polylines.value[index]

    let type = 'new'
    if (editingPoint.value) {
      const positions = polyline.positions
      positions.splice(editingPoint.value._index, 1, position)
      type = editorType
    } else {
      const tempPositions = polyline.tempPositions.slice()

      tempPositions.push(position)
      polyline.positions = tempPositions
    }

    return {
      index: index,
      polylines: polylines,
      finished: false,
      position: position,
      windowPoistion: movement,
      type: type
    }
  }

  const handleDoubleClick = movement => {
    if (drawStatus.value === DrawStatus.Drawing) {
      const index = editingPoint.value ? editingPoint.value._vcPolylineIndx : polylines.value.length - 1
      const polyline: PolylineDrawing = polylines.value[index]
      polyline.positions = polyline.tempPositions
      polyline.drawStatus = DrawStatus.AfterDraw
      drawStatus.value = DrawStatus.AfterDraw
      drawTip.value = drawTipOpts.drawTip1
      return {
        index: index,
        polylines: polylines,
        finished: true,
        position: polyline.positions[polyline.positions.length - 1],
        windowPoistion: movement,
        type: 'new'
      }
    }
  }

  const onMouseoverPoints = function (this, e) {
    const { drawingHandlerActive, viewer } = $services
    if (props.editable && drawStatus.value !== DrawStatus.Drawing && drawingHandlerActive) {
      e.pickedFeature.primitive.pixelSize = props.pointOpts.pixelSize * 1.5
      removeTimeout()
      registerTimeout(() => {
        mouseoverPoint.value = e.pickedFeature.primitive
        editorPosition.value = e.pickedFeature.primitive.position
        showEditor.value = true
        canShowDrawTip.value = false
        drawTipPosition.value = [0, 0, 0]
      }, props.editorOpts.delay)
    }

    emit(
      'mouseEvt',
      {
        type: e.type,
        name: this,
        target: e
      },
      viewer
    )
  }
  const onMouseoutPoints = function (this, e) {
    const { viewer, selectedMeasurementOption } = $services

    if (props.editable) {
      e.pickedFeature.primitive.pixelSize = props.pointOpts.pixelSize * 1.0
      removeTimeout()
      registerTimeout(() => {
        editorPosition.value = [0, 0, 0]
        mouseoverPoint.value = undefined
        showEditor.value = false
      }, props.editorOpts.hideDelay)
      selectedMeasurementOption && (canShowDrawTip.value = true)
    }

    emit(
      'mouseEvt',
      {
        type: e.type,
        target: e,
        name: this
      },
      viewer
    )
  }

  const onMouseenterEditor = evt => {
    removeTimeout()
  }

  const onMouseleaveEditor = evt => {
    removeTimeout()
    registerTimeout(() => {
      editorPosition.value = [0, 0, 0]
      mouseoverPoint.value.pixelSize = props.pointOpts.pixelSize * 1.0
      mouseoverPoint.value = undefined
      showEditor.value = false
    }, props.editorOpts.hideDelay)
  }

  const onEditorClick = function (this, e) {
    editorPosition.value = [0, 0, 0]
    showEditor.value = false

    if (!props.editable) {
      return
    }

    const { viewer } = $services
    editorType = e
    if (e === 'move') {
      drawTip.value = drawTipOpts.drawTip3
      drawStatus.value = DrawStatus.Drawing
      editingPoint.value = mouseoverPoint.value
      canShowDrawTip.value = true
      restorePosition = polylines.value[editingPoint.value._vcPolylineIndx].positions[editingPoint.value._index]
    } else if (e === 'insert') {
      const index = mouseoverPoint.value._vcPolylineIndx
      const polyline = polylines.value[index]
      polyline.positions.splice(mouseoverPoint.value._index, 0, mouseoverPoint.value.position)
      editingPoint.value = mouseoverPoint.value
      canShowDrawTip.value = true
      drawStatus.value = DrawStatus.Drawing
      drawTip.value = drawTipOpts.drawTip3
    } else if (e === 'remove') {
      const index = mouseoverPoint.value._vcPolylineIndx
      const polyline = polylines.value[index]
      polyline.positions.length > 2 && polyline.positions.splice(mouseoverPoint.value._index, 1)
    } else if (e === 'removeAll') {
      const index = mouseoverPoint.value._vcPolylineIndx
      polylines.value.splice(index, 1)
    }

    emit(
      'editorEvt',
      {
        type: e,
        polylines: polylines,
        name: this,
        index: mouseoverPoint.value._vcPolylineIndx
      },
      viewer
    )
  }

  return {
    handleMouseClick,
    handleMouseMove,
    handleDoubleClick,
    polylines,
    startNew,
    stop,
    onMouseoverPoints,
    onMouseoutPoints,
    onEditorClick,
    onMouseenterEditor,
    onMouseleaveEditor,
    canShowDrawTip,
    drawTipPosition,
    drawTip,
    showEditor,
    editorPosition,
    mouseoverPoint
  }
}