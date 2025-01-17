define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './ArcType-98ec98bf',
  './GeometryOffsetAttribute-1772960d',
  './BoundingRectangle-218a9c7b',
  './Transforms-d13cc04e',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidTangentPlane-eecce7e8',
  './GeometryAttribute-43536dc0',
  './GeometryInstance-47b34185',
  './GeometryPipeline-2356afec',
  './IndexDatatype-b7d979a6',
  './PolygonGeometryLibrary-dec9574a',
  './PolygonPipeline-da7fc5ca',
  './VertexFormat-71718faa',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './arrayRemoveDuplicates-18786327',
  './EllipsoidRhumbLine-30c47ff4',
  './GeometryAttributes-7827a6c2'
], function (e, t, r, a, o, i, n, s, l, u, c, p, m, y, g, d, h, f, v, b, _, P, x, w, C, T, I) {
  'use strict'
  var A = new t.Cartographic(),
    E = new t.Cartographic()
  function G(e, t, r, a) {
    var o = a.cartesianToCartographic(e, A).height,
      i = a.cartesianToCartographic(t, E)
    ;(i.height = o), a.cartographicToCartesian(i, t)
    var n = a.cartesianToCartographic(r, E)
    ;(n.height = o - 100), a.cartographicToCartesian(n, r)
  }
  var O = new o.BoundingRectangle(),
    V = new t.Cartesian3(),
    F = new t.Cartesian3(),
    D = new t.Cartesian3(),
    L = new t.Cartesian3(),
    N = new t.Cartesian3(),
    H = new t.Cartesian3(),
    R = new t.Cartesian3(),
    M = new t.Cartesian3(),
    S = new t.Cartesian3(),
    B = new t.Cartesian2(),
    k = new t.Cartesian2(),
    z = new t.Cartesian3(),
    W = new i.Quaternion(),
    Y = new t.Matrix3(),
    U = new t.Matrix3()
  function j(r) {
    var o = r.vertexFormat,
      n = r.geometry,
      l = r.shadowVolume,
      u = n.attributes.position.values,
      p = u.length,
      m = r.wall,
      y = r.top || m,
      g = r.bottom || m
    if (o.st || o.normal || o.tangent || o.bitangent || l) {
      var d = r.boundingRectangle,
        h = r.tangentPlane,
        f = r.ellipsoid,
        v = r.stRotation,
        b = r.perPositionHeight,
        _ = B
      ;(_.x = d.x), (_.y = d.y)
      var P,
        x = o.st ? new Float32Array((p / 3) * 2) : void 0
      o.normal && (P = b && y && !m ? n.attributes.normal.values : new Float32Array(p))
      var w = o.tangent ? new Float32Array(p) : void 0,
        C = o.bitangent ? new Float32Array(p) : void 0,
        T = l ? new Float32Array(p) : void 0,
        I = 0,
        A = 0,
        E = F,
        O = D,
        j = L,
        Q = !0,
        q = Y,
        K = U
      if (0 !== v) {
        var Z = i.Quaternion.fromAxisAngle(h._plane.normal, v, W)
        ;(q = t.Matrix3.fromQuaternion(Z, q)), (Z = i.Quaternion.fromAxisAngle(h._plane.normal, -v, W)), (K = t.Matrix3.fromQuaternion(Z, K))
      } else (q = t.Matrix3.clone(t.Matrix3.IDENTITY, q)), (K = t.Matrix3.clone(t.Matrix3.IDENTITY, K))
      var J = 0,
        X = 0
      y && g && ((J = p / 2), (X = p / 3), (p /= 2))
      for (var $ = 0; $ < p; $ += 3) {
        var ee = t.Cartesian3.fromArray(u, $, z)
        if (o.st) {
          var te = t.Matrix3.multiplyByVector(q, ee, V)
          te = f.scaleToGeodeticSurface(te, te)
          var re = h.projectPointOntoPlane(te, k)
          t.Cartesian2.subtract(re, _, re)
          var ae = s.CesiumMath.clamp(re.x / d.width, 0, 1),
            oe = s.CesiumMath.clamp(re.y / d.height, 0, 1)
          g && ((x[I + X] = ae), (x[I + 1 + X] = oe)), y && ((x[I] = ae), (x[I + 1] = oe)), (I += 2)
        }
        if (o.normal || o.tangent || o.bitangent || l) {
          var ie = A + 1,
            ne = A + 2
          if (m) {
            if ($ + 3 < p) {
              var se = t.Cartesian3.fromArray(u, $ + 3, N)
              if (Q) {
                var le = t.Cartesian3.fromArray(u, $ + p, H)
                b && G(ee, se, le, f),
                  t.Cartesian3.subtract(se, ee, se),
                  t.Cartesian3.subtract(le, ee, le),
                  (E = t.Cartesian3.normalize(t.Cartesian3.cross(le, se, E), E)),
                  (Q = !1)
              }
              t.Cartesian3.equalsEpsilon(se, ee, s.CesiumMath.EPSILON10) && (Q = !0)
            }
            ;(o.tangent || o.bitangent) &&
              ((j = f.geodeticSurfaceNormal(ee, j)), o.tangent && (O = t.Cartesian3.normalize(t.Cartesian3.cross(j, E, O), O)))
          } else
            (E = f.geodeticSurfaceNormal(ee, E)),
              (o.tangent || o.bitangent) &&
                (b &&
                  ((R = t.Cartesian3.fromArray(P, A, R)),
                  (M = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, R, M)),
                  (M = t.Cartesian3.normalize(t.Matrix3.multiplyByVector(K, M, M), M)),
                  o.bitangent && (S = t.Cartesian3.normalize(t.Cartesian3.cross(R, M, S), S))),
                (O = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, E, O)),
                (O = t.Cartesian3.normalize(t.Matrix3.multiplyByVector(K, O, O), O)),
                o.bitangent && (j = t.Cartesian3.normalize(t.Cartesian3.cross(E, O, j), j)))
          o.normal &&
            (r.wall ? ((P[A + J] = E.x), (P[ie + J] = E.y), (P[ne + J] = E.z)) : g && ((P[A + J] = -E.x), (P[ie + J] = -E.y), (P[ne + J] = -E.z)),
            ((y && !b) || m) && ((P[A] = E.x), (P[ie] = E.y), (P[ne] = E.z))),
            l && (m && (E = f.geodeticSurfaceNormal(ee, E)), (T[A + J] = -E.x), (T[ie + J] = -E.y), (T[ne + J] = -E.z)),
            o.tangent &&
              (r.wall ? ((w[A + J] = O.x), (w[ie + J] = O.y), (w[ne + J] = O.z)) : g && ((w[A + J] = -O.x), (w[ie + J] = -O.y), (w[ne + J] = -O.z)),
              y && (b ? ((w[A] = M.x), (w[ie] = M.y), (w[ne] = M.z)) : ((w[A] = O.x), (w[ie] = O.y), (w[ne] = O.z)))),
            o.bitangent &&
              (g && ((C[A + J] = j.x), (C[ie + J] = j.y), (C[ne + J] = j.z)),
              y && (b ? ((C[A] = S.x), (C[ie] = S.y), (C[ne] = S.z)) : ((C[A] = j.x), (C[ie] = j.y), (C[ne] = j.z)))),
            (A += 3)
        }
      }
      o.st && (n.attributes.st = new c.GeometryAttribute({ componentDatatype: s.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: x })),
        o.normal &&
          (n.attributes.normal = new c.GeometryAttribute({ componentDatatype: s.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: P })),
        o.tangent &&
          (n.attributes.tangent = new c.GeometryAttribute({ componentDatatype: s.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: w })),
        o.bitangent &&
          (n.attributes.bitangent = new c.GeometryAttribute({ componentDatatype: s.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: C })),
        l &&
          (n.attributes.extrudeDirection = new c.GeometryAttribute({
            componentDatatype: s.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: T
          }))
    }
    if (r.extrude && e.defined(r.offsetAttribute)) {
      var ue = u.length / 3,
        ce = new Uint8Array(ue)
      if (r.offsetAttribute === a.GeometryOffsetAttribute.TOP) (y && g) || m ? (ce = a.arrayFill(ce, 1, 0, ue / 2)) : y && (ce = a.arrayFill(ce, 1))
      else {
        var pe = r.offsetAttribute === a.GeometryOffsetAttribute.NONE ? 0 : 1
        ce = a.arrayFill(ce, pe)
      }
      n.attributes.applyOffset = new c.GeometryAttribute({
        componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: ce
      })
    }
    return n
  }
  var Q = new t.Cartographic(),
    q = new t.Cartographic(),
    K = { westOverIDL: 0, eastOverIDL: 0 },
    Z = new l.EllipsoidGeodesic()
  function J(a, o, i, n, u) {
    if (((u = e.defaultValue(u, new t.Rectangle())), !e.defined(a) || a.length < 3))
      return (u.west = 0), (u.north = 0), (u.south = 0), (u.east = 0), u
    if (i === r.ArcType.RHUMB) return t.Rectangle.fromCartesianArray(a, o, u)
    Z.ellipsoid.equals(o) || (Z = new l.EllipsoidGeodesic(void 0, void 0, o)),
      (u.west = Number.POSITIVE_INFINITY),
      (u.east = Number.NEGATIVE_INFINITY),
      (u.south = Number.POSITIVE_INFINITY),
      (u.north = Number.NEGATIVE_INFINITY),
      (K.westOverIDL = Number.POSITIVE_INFINITY),
      (K.eastOverIDL = Number.NEGATIVE_INFINITY)
    for (var c, p = 1 / s.CesiumMath.chordLength(n, o.maximumRadius), m = a.length, y = o.cartesianToCartographic(a[0], q), g = Q, d = 1; d < m; d++)
      (c = g), (g = y), (y = o.cartesianToCartographic(a[d], c)), Z.setEndPoints(g, y), $(Z, p, u, K)
    return (
      (c = g),
      (g = y),
      (y = o.cartesianToCartographic(a[0], c)),
      Z.setEndPoints(g, y),
      $(Z, p, u, K),
      u.east - u.west > K.eastOverIDL - K.westOverIDL &&
        ((u.west = K.westOverIDL),
        (u.east = K.eastOverIDL),
        u.east > s.CesiumMath.PI && (u.east = u.east - s.CesiumMath.TWO_PI),
        u.west > s.CesiumMath.PI && (u.west = u.west - s.CesiumMath.TWO_PI)),
      u
    )
  }
  var X = new t.Cartographic()
  function $(e, t, r, a) {
    for (var o = e.surfaceDistance, i = Math.ceil(o * t), n = i > 0 ? o / (i - 1) : Number.POSITIVE_INFINITY, l = 0, u = 0; u < i; u++) {
      var c = e.interpolateUsingSurfaceDistance(l, X)
      l += n
      var p = c.longitude,
        m = c.latitude
      ;(r.west = Math.min(r.west, p)), (r.east = Math.max(r.east, p)), (r.south = Math.min(r.south, m)), (r.north = Math.max(r.north, m))
      var y = p >= 0 ? p : p + s.CesiumMath.TWO_PI
      ;(a.westOverIDL = Math.min(a.westOverIDL, y)), (a.eastOverIDL = Math.max(a.eastOverIDL, y))
    }
  }
  var ee = []
  function te(e, t, r, a, o, i, n, s, l) {
    var c,
      m = { walls: [] }
    if (i || n) {
      var h,
        f,
        v = g.PolygonGeometryLibrary.createGeometryFromPositions(e, t, r, o, s, l),
        b = v.attributes.position.values,
        _ = v.indices
      if (i && n) {
        var P = b.concat(b)
        ;(h = P.length / 3), (f = y.IndexDatatype.createTypedArray(h, 2 * _.length)).set(_)
        var x = _.length,
          w = h / 2
        for (c = 0; c < x; c += 3) {
          var C = f[c] + w,
            T = f[c + 1] + w,
            I = f[c + 2] + w
          ;(f[c + x] = I), (f[c + 1 + x] = T), (f[c + 2 + x] = C)
        }
        if (((v.attributes.position.values = P), o && s.normal)) {
          var A = v.attributes.normal.values
          ;(v.attributes.normal.values = new Float32Array(P.length)), v.attributes.normal.values.set(A)
        }
        v.indices = f
      } else if (n) {
        for (h = b.length / 3, f = y.IndexDatatype.createTypedArray(h, _.length), c = 0; c < _.length; c += 3)
          (f[c] = _[c + 2]), (f[c + 1] = _[c + 1]), (f[c + 2] = _[c])
        v.indices = f
      }
      m.topAndBottom = new p.GeometryInstance({ geometry: v })
    }
    var E = a.outerRing,
      G = u.EllipsoidTangentPlane.fromPoints(E, e),
      O = G.projectPointsOntoPlane(E, ee),
      V = d.PolygonPipeline.computeWindingOrder2D(O)
    V === d.WindingOrder.CLOCKWISE && (E = E.slice().reverse())
    var F = g.PolygonGeometryLibrary.computeWallGeometry(E, e, r, o, l)
    m.walls.push(new p.GeometryInstance({ geometry: F }))
    var D = a.holes
    for (c = 0; c < D.length; c++) {
      var L = D[c]
      ;(O = (G = u.EllipsoidTangentPlane.fromPoints(L, e)).projectPointsOntoPlane(L, ee)),
        (V = d.PolygonPipeline.computeWindingOrder2D(O)) === d.WindingOrder.COUNTER_CLOCKWISE && (L = L.slice().reverse()),
        (F = g.PolygonGeometryLibrary.computeWallGeometry(L, e, r, o, l)),
        m.walls.push(new p.GeometryInstance({ geometry: F }))
    }
    return m
  }
  function re(a) {
    var o = a.polygonHierarchy,
      i = e.defaultValue(a.vertexFormat, h.VertexFormat.DEFAULT),
      n = e.defaultValue(a.ellipsoid, t.Ellipsoid.WGS84),
      l = e.defaultValue(a.granularity, s.CesiumMath.RADIANS_PER_DEGREE),
      u = e.defaultValue(a.stRotation, 0),
      c = e.defaultValue(a.perPositionHeight, !1),
      p = c && e.defined(a.extrudedHeight),
      m = e.defaultValue(a.height, 0),
      y = e.defaultValue(a.extrudedHeight, m)
    if (!p) {
      var d = Math.max(m, y)
      ;(y = Math.min(m, y)), (m = d)
    }
    ;(this._vertexFormat = h.VertexFormat.clone(i)),
      (this._ellipsoid = t.Ellipsoid.clone(n)),
      (this._granularity = l),
      (this._stRotation = u),
      (this._height = m),
      (this._extrudedHeight = y),
      (this._closeTop = e.defaultValue(a.closeTop, !0)),
      (this._closeBottom = e.defaultValue(a.closeBottom, !0)),
      (this._polygonHierarchy = o),
      (this._perPositionHeight = c),
      (this._perPositionHeightExtrude = p),
      (this._shadowVolume = e.defaultValue(a.shadowVolume, !1)),
      (this._workerName = 'createPolygonGeometry'),
      (this._offsetAttribute = a.offsetAttribute),
      (this._arcType = e.defaultValue(a.arcType, r.ArcType.GEODESIC)),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0),
      (this.packedLength = g.PolygonGeometryLibrary.computeHierarchyPackedLength(o) + t.Ellipsoid.packedLength + h.VertexFormat.packedLength + 12)
  }
  ;(re.fromPositions = function (t) {
    return new re({
      polygonHierarchy: { positions: (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions },
      height: t.height,
      extrudedHeight: t.extrudedHeight,
      vertexFormat: t.vertexFormat,
      stRotation: t.stRotation,
      ellipsoid: t.ellipsoid,
      granularity: t.granularity,
      perPositionHeight: t.perPositionHeight,
      closeTop: t.closeTop,
      closeBottom: t.closeBottom,
      offsetAttribute: t.offsetAttribute,
      arcType: t.arcType
    })
  }),
    (re.pack = function (r, a, o) {
      return (
        (o = e.defaultValue(o, 0)),
        (o = g.PolygonGeometryLibrary.packPolygonHierarchy(r._polygonHierarchy, a, o)),
        t.Ellipsoid.pack(r._ellipsoid, a, o),
        (o += t.Ellipsoid.packedLength),
        h.VertexFormat.pack(r._vertexFormat, a, o),
        (o += h.VertexFormat.packedLength),
        (a[o++] = r._height),
        (a[o++] = r._extrudedHeight),
        (a[o++] = r._granularity),
        (a[o++] = r._stRotation),
        (a[o++] = r._perPositionHeightExtrude ? 1 : 0),
        (a[o++] = r._perPositionHeight ? 1 : 0),
        (a[o++] = r._closeTop ? 1 : 0),
        (a[o++] = r._closeBottom ? 1 : 0),
        (a[o++] = r._shadowVolume ? 1 : 0),
        (a[o++] = e.defaultValue(r._offsetAttribute, -1)),
        (a[o++] = r._arcType),
        (a[o] = r.packedLength),
        a
      )
    })
  var ae = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    oe = new h.VertexFormat(),
    ie = { polygonHierarchy: {} }
  return (
    (re.unpack = function (r, a, o) {
      a = e.defaultValue(a, 0)
      var i = g.PolygonGeometryLibrary.unpackPolygonHierarchy(r, a)
      ;(a = i.startingIndex), delete i.startingIndex
      var n = t.Ellipsoid.unpack(r, a, ae)
      a += t.Ellipsoid.packedLength
      var s = h.VertexFormat.unpack(r, a, oe)
      a += h.VertexFormat.packedLength
      var l = r[a++],
        u = r[a++],
        c = r[a++],
        p = r[a++],
        m = 1 === r[a++],
        y = 1 === r[a++],
        d = 1 === r[a++],
        f = 1 === r[a++],
        v = 1 === r[a++],
        b = r[a++],
        _ = r[a++],
        P = r[a]
      return (
        e.defined(o) || (o = new re(ie)),
        (o._polygonHierarchy = i),
        (o._ellipsoid = t.Ellipsoid.clone(n, o._ellipsoid)),
        (o._vertexFormat = h.VertexFormat.clone(s, o._vertexFormat)),
        (o._height = l),
        (o._extrudedHeight = u),
        (o._granularity = c),
        (o._stRotation = p),
        (o._perPositionHeightExtrude = m),
        (o._perPositionHeight = y),
        (o._closeTop = d),
        (o._closeBottom = f),
        (o._shadowVolume = v),
        (o._offsetAttribute = -1 === b ? void 0 : b),
        (o._arcType = _),
        (o.packedLength = P),
        o
      )
    }),
    (re.computeRectangle = function (a, o) {
      var i = e.defaultValue(a.granularity, s.CesiumMath.RADIANS_PER_DEGREE),
        n = e.defaultValue(a.arcType, r.ArcType.GEODESIC),
        l = a.polygonHierarchy,
        u = e.defaultValue(a.ellipsoid, t.Ellipsoid.WGS84)
      return J(l.positions, u, n, i, o)
    }),
    (re.createGeometry = function (t) {
      var r = t._vertexFormat,
        o = t._ellipsoid,
        n = t._granularity,
        l = t._stRotation,
        h = t._polygonHierarchy,
        f = t._perPositionHeight,
        v = t._closeTop,
        b = t._closeBottom,
        _ = t._arcType,
        P = h.positions
      if (!(P.length < 3)) {
        var x = u.EllipsoidTangentPlane.fromPoints(P, o),
          w = g.PolygonGeometryLibrary.polygonsFromHierarchy(h, x.projectPointsOntoPlane.bind(x), !f, o),
          C = w.hierarchy,
          T = w.polygons
        if (0 !== C.length) {
          P = C[0].outerRing
          var I,
            A = g.PolygonGeometryLibrary.computeBoundingRectangle(x.plane.normal, x.projectPointOntoPlane.bind(x), P, l, O),
            E = [],
            G = t._height,
            V = t._extrudedHeight,
            F = {
              perPositionHeight: f,
              vertexFormat: r,
              geometry: void 0,
              tangentPlane: x,
              boundingRectangle: A,
              ellipsoid: o,
              stRotation: l,
              bottom: !1,
              top: !0,
              wall: !1,
              extrude: !1,
              arcType: _
            }
          if (t._perPositionHeightExtrude || !s.CesiumMath.equalsEpsilon(G, V, 0, s.CesiumMath.EPSILON2))
            for (
              F.extrude = !0, F.top = v, F.bottom = b, F.shadowVolume = t._shadowVolume, F.offsetAttribute = t._offsetAttribute, I = 0;
              I < T.length;
              I++
            ) {
              var D,
                L = te(o, T[I], n, C[I], f, v, b, r, _)
              v && b
                ? ((D = L.topAndBottom), (F.geometry = g.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(D.geometry, G, V, o, f)))
                : v
                ? (((D = L.topAndBottom).geometry.attributes.position.values = d.PolygonPipeline.scaleToGeodeticHeight(
                    D.geometry.attributes.position.values,
                    G,
                    o,
                    !f
                  )),
                  (F.geometry = D.geometry))
                : b &&
                  (((D = L.topAndBottom).geometry.attributes.position.values = d.PolygonPipeline.scaleToGeodeticHeight(
                    D.geometry.attributes.position.values,
                    V,
                    o,
                    !0
                  )),
                  (F.geometry = D.geometry)),
                (v || b) && ((F.wall = !1), (D.geometry = j(F)), E.push(D))
              var N = L.walls
              F.wall = !0
              for (var H = 0; H < N.length; H++) {
                var R = N[H]
                ;(F.geometry = g.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(R.geometry, G, V, o, f)), (R.geometry = j(F)), E.push(R)
              }
            }
          else
            for (I = 0; I < T.length; I++) {
              var M = new p.GeometryInstance({ geometry: g.PolygonGeometryLibrary.createGeometryFromPositions(o, T[I], n, f, r, _) })
              if (
                ((M.geometry.attributes.position.values = d.PolygonPipeline.scaleToGeodeticHeight(M.geometry.attributes.position.values, G, o, !f)),
                (F.geometry = M.geometry),
                (M.geometry = j(F)),
                e.defined(t._offsetAttribute))
              ) {
                var S = M.geometry.attributes.position.values.length,
                  B = new Uint8Array(S / 3),
                  k = t._offsetAttribute === a.GeometryOffsetAttribute.NONE ? 0 : 1
                a.arrayFill(B, k),
                  (M.geometry.attributes.applyOffset = new c.GeometryAttribute({
                    componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                    componentsPerAttribute: 1,
                    values: B
                  }))
              }
              E.push(M)
            }
          var z = m.GeometryPipeline.combineInstances(E)[0]
          ;(z.attributes.position.values = new Float64Array(z.attributes.position.values)),
            (z.indices = y.IndexDatatype.createTypedArray(z.attributes.position.values.length / 3, z.indices))
          var W = z.attributes,
            Y = i.BoundingSphere.fromVertices(W.position.values)
          return (
            r.position || delete W.position,
            new c.Geometry({
              attributes: W,
              indices: z.indices,
              primitiveType: z.primitiveType,
              boundingSphere: Y,
              offsetAttribute: t._offsetAttribute
            })
          )
        }
      }
    }),
    (re.createShadowVolume = function (e, t, r) {
      var a = e._granularity,
        o = e._ellipsoid,
        i = t(a, o),
        n = r(a, o)
      return new re({
        polygonHierarchy: e._polygonHierarchy,
        ellipsoid: o,
        stRotation: e._stRotation,
        granularity: a,
        perPositionHeight: !1,
        extrudedHeight: i,
        height: n,
        vertexFormat: h.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
        arcType: e._arcType
      })
    }),
    Object.defineProperties(re.prototype, {
      rectangle: {
        get: function () {
          if (!e.defined(this._rectangle)) {
            var t = this._polygonHierarchy.positions
            this._rectangle = J(t, this._ellipsoid, this._arcType, this._granularity)
          }
          return this._rectangle
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            e.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                var t = -e._stRotation
                if (0 === t) return [0, 0, 0, 1, 1, 0]
                var r = e._ellipsoid,
                  a = e._polygonHierarchy.positions,
                  o = e.rectangle
                return c.Geometry._textureCoordinateRotationPoints(a, t, r, o)
              })(this)),
            this._textureCoordinateRotationPoints
          )
        }
      }
    }),
    function (r, a) {
      return e.defined(a) && (r = re.unpack(r, a)), (r._ellipsoid = t.Ellipsoid.clone(r._ellipsoid)), re.createGeometry(r)
    }
  )
})
