define([
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './EllipseOutlineGeometry-247f65c5',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './combine-83860057',
  './EllipseGeometryLibrary-962723df',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6'
], function (e, i, t, r, l, n, s, o, a, u, c, d, m) {
  'use strict'
  function p(e) {
    var i = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).radius,
      l = {
        center: e.center,
        semiMajorAxis: i,
        semiMinorAxis: i,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        numberOfVerticalLines: e.numberOfVerticalLines
      }
    ;(this._ellipseGeometry = new r.EllipseOutlineGeometry(l)), (this._workerName = 'createCircleOutlineGeometry')
  }
  ;(p.packedLength = r.EllipseOutlineGeometry.packedLength),
    (p.pack = function (e, i, t) {
      return r.EllipseOutlineGeometry.pack(e._ellipseGeometry, i, t)
    })
  var y = new r.EllipseOutlineGeometry({ center: new e.Cartesian3(), semiMajorAxis: 1, semiMinorAxis: 1 }),
    G = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      numberOfVerticalLines: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0
    }
  return (
    (p.unpack = function (i, l, n) {
      var s = r.EllipseOutlineGeometry.unpack(i, l, y)
      return (
        (G.center = e.Cartesian3.clone(s._center, G.center)),
        (G.ellipsoid = e.Ellipsoid.clone(s._ellipsoid, G.ellipsoid)),
        (G.height = s._height),
        (G.extrudedHeight = s._extrudedHeight),
        (G.granularity = s._granularity),
        (G.numberOfVerticalLines = s._numberOfVerticalLines),
        t.defined(n)
          ? ((G.semiMajorAxis = s._semiMajorAxis), (G.semiMinorAxis = s._semiMinorAxis), (n._ellipseGeometry = new r.EllipseOutlineGeometry(G)), n)
          : ((G.radius = s._semiMajorAxis), new p(G))
      )
    }),
    (p.createGeometry = function (e) {
      return r.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)
    }),
    function (i, r) {
      return (
        t.defined(r) && (i = p.unpack(i, r)),
        (i._ellipseGeometry._center = e.Cartesian3.clone(i._ellipseGeometry._center)),
        (i._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid)),
        p.createGeometry(i)
      )
    }
  )
})
