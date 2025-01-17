define([
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './ComponentDatatype-93750d1a',
  './ArcType-98ec98bf',
  './arrayRemoveDuplicates-18786327',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4',
  './EncodedCartesian3-f286cedc',
  './GeometryAttribute-43536dc0',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './WebMercatorProjection-58801a11',
  './combine-83860057',
  './WebGLConstants-1c8239cc'
], function (e, a, t, n, i, r, s, o, l, u, c, C, p, d, h, g) {
  'use strict'
  function f(t) {
    ;(t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT)),
      (this._ellipsoid = n.defaultValue(t.ellipsoid, a.Ellipsoid.WGS84)),
      (this._rectangle = n.defaultValue(t.rectangle, a.Rectangle.MAX_VALUE)),
      (this._projection = new e.GeographicProjection(this._ellipsoid)),
      (this._numberOfLevelZeroTilesX = n.defaultValue(t.numberOfLevelZeroTilesX, 2)),
      (this._numberOfLevelZeroTilesY = n.defaultValue(t.numberOfLevelZeroTilesY, 1))
  }
  Object.defineProperties(f.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    rectangle: {
      get: function () {
        return this._rectangle
      }
    },
    projection: {
      get: function () {
        return this._projection
      }
    }
  }),
    (f.prototype.getNumberOfXTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesX << e
    }),
    (f.prototype.getNumberOfYTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesY << e
    }),
    (f.prototype.rectangleToNativeRectangle = function (e, t) {
      var r = i.CesiumMath.toDegrees(e.west),
        s = i.CesiumMath.toDegrees(e.south),
        o = i.CesiumMath.toDegrees(e.east),
        l = i.CesiumMath.toDegrees(e.north)
      return n.defined(t) ? ((t.west = r), (t.south = s), (t.east = o), (t.north = l), t) : new a.Rectangle(r, s, o, l)
    }),
    (f.prototype.tileXYToNativeRectangle = function (e, a, t, n) {
      var r = this.tileXYToRectangle(e, a, t, n)
      return (
        (r.west = i.CesiumMath.toDegrees(r.west)),
        (r.south = i.CesiumMath.toDegrees(r.south)),
        (r.east = i.CesiumMath.toDegrees(r.east)),
        (r.north = i.CesiumMath.toDegrees(r.north)),
        r
      )
    }),
    (f.prototype.tileXYToRectangle = function (e, t, i, r) {
      var s = this._rectangle,
        o = this.getNumberOfXTilesAtLevel(i),
        l = this.getNumberOfYTilesAtLevel(i),
        u = s.width / o,
        c = e * u + s.west,
        C = (e + 1) * u + s.west,
        p = s.height / l,
        d = s.north - t * p,
        h = s.north - (t + 1) * p
      return n.defined(r) || (r = new a.Rectangle(c, h, C, d)), (r.west = c), (r.south = h), (r.east = C), (r.north = d), r
    }),
    (f.prototype.positionToTileXY = function (e, t, r) {
      var s = this._rectangle
      if (a.Rectangle.contains(s, e)) {
        var o = this.getNumberOfXTilesAtLevel(t),
          l = this.getNumberOfYTilesAtLevel(t),
          u = s.width / o,
          c = s.height / l,
          C = e.longitude
        s.east < s.west && (C += i.CesiumMath.TWO_PI)
        var p = ((C - s.west) / u) | 0
        p >= o && (p = o - 1)
        var d = ((s.north - e.latitude) / c) | 0
        return d >= l && (d = l - 1), n.defined(r) ? ((r.x = p), (r.y = d), r) : new a.Cartesian2(p, d)
      }
    })
  var m = new a.Cartesian3(),
    w = new a.Cartesian3(),
    v = new a.Cartographic(),
    y = new a.Cartesian3(),
    M = new a.Cartesian3(),
    T = new e.BoundingSphere(),
    E = new f(),
    _ = [new a.Cartographic(), new a.Cartographic(), new a.Cartographic(), new a.Cartographic()],
    O = new a.Cartesian2(),
    P = {}
  function b(e) {
    a.Cartographic.fromRadians(e.east, e.north, 0, _[0]),
      a.Cartographic.fromRadians(e.west, e.north, 0, _[1]),
      a.Cartographic.fromRadians(e.east, e.south, 0, _[2]),
      a.Cartographic.fromRadians(e.west, e.south, 0, _[3])
    var t,
      n = 0,
      i = 0,
      r = 0,
      s = 0,
      o = P._terrainHeightsMaxLevel
    for (t = 0; t <= o; ++t) {
      for (var l = !1, u = 0; u < 4; ++u) {
        var c = _[u]
        if ((E.positionToTileXY(c, t, O), 0 === u)) (r = O.x), (s = O.y)
        else if (r !== O.x || s !== O.y) {
          l = !0
          break
        }
      }
      if (l) break
      ;(n = r), (i = s)
    }
    if (0 !== t) return { x: n, y: i, level: t > o ? o : t - 1 }
  }
  ;(P.initialize = function () {
    var a = P._initPromise
    return (
      n.defined(a) ||
        ((a = e.Resource.fetchJson(e.buildModuleUrl('Assets/approximateTerrainHeights.json')).then(function (e) {
          P._terrainHeights = e
        })),
        (P._initPromise = a)),
      a
    )
  }),
    (P.getMinimumMaximumHeights = function (e, t) {
      t = n.defaultValue(t, a.Ellipsoid.WGS84)
      var i = b(e),
        r = P._defaultMinTerrainHeight,
        s = P._defaultMaxTerrainHeight
      if (n.defined(i)) {
        var o = i.level + '-' + i.x + '-' + i.y,
          l = P._terrainHeights[o]
        n.defined(l) && ((r = l[0]), (s = l[1])),
          t.cartographicToCartesian(a.Rectangle.northeast(e, v), m),
          t.cartographicToCartesian(a.Rectangle.southwest(e, v), w),
          a.Cartesian3.midpoint(w, m, y)
        var u = t.scaleToGeodeticSurface(y, M)
        if (n.defined(u)) {
          var c = a.Cartesian3.distance(y, u)
          r = Math.min(r, -c)
        } else r = P._defaultMinTerrainHeight
      }
      return { minimumTerrainHeight: (r = Math.max(P._defaultMinTerrainHeight, r)), maximumTerrainHeight: s }
    }),
    (P.getBoundingSphere = function (t, i) {
      i = n.defaultValue(i, a.Ellipsoid.WGS84)
      var r = b(t),
        s = P._defaultMaxTerrainHeight
      if (n.defined(r)) {
        var o = r.level + '-' + r.x + '-' + r.y,
          l = P._terrainHeights[o]
        n.defined(l) && (s = l[1])
      }
      var u = e.BoundingSphere.fromRectangle3D(t, i, 0)
      return e.BoundingSphere.fromRectangle3D(t, i, s, T), e.BoundingSphere.union(u, T, u)
    }),
    (P._terrainHeightsMaxLevel = 6),
    (P._defaultMaxTerrainHeight = 9e3),
    (P._defaultMinTerrainHeight = -1e5),
    (P._terrainHeights = void 0),
    (P._initPromise = void 0),
    Object.defineProperties(P, {
      initialized: {
        get: function () {
          return n.defined(P._terrainHeights)
        }
      }
    })
  var A = [e.GeographicProjection, d.WebMercatorProjection],
    k = A.length,
    L = Math.cos(i.CesiumMath.toRadians(30)),
    S = Math.cos(i.CesiumMath.toRadians(150))
  function x(e) {
    var t = (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)).positions
    ;(this.width = n.defaultValue(e.width, 1)),
      (this._positions = t),
      (this.granularity = n.defaultValue(e.granularity, 9999)),
      (this.loop = n.defaultValue(e.loop, !1)),
      (this.arcType = n.defaultValue(e.arcType, r.ArcType.GEODESIC)),
      (this._ellipsoid = a.Ellipsoid.WGS84),
      (this._projectionIndex = 0),
      (this._workerName = 'createGroundPolylineGeometry'),
      (this._scene3DOnly = !1)
  }
  Object.defineProperties(x.prototype, {
    packedLength: {
      get: function () {
        return 1 + 3 * this._positions.length + 1 + 1 + 1 + a.Ellipsoid.packedLength + 1 + 1
      }
    }
  }),
    (x.setProjectionAndEllipsoid = function (e, a) {
      for (var t = 0, n = 0; n < k; n++)
        if (a instanceof A[n]) {
          t = n
          break
        }
      ;(e._projectionIndex = t), (e._ellipsoid = a.ellipsoid)
    })
  var I = new a.Cartesian3(),
    N = new a.Cartesian3(),
    R = new a.Cartesian3()
  function D(e, t, n, i, r) {
    var s = Y(i, e, 0, I),
      o = Y(i, e, n, N),
      l = Y(i, t, 0, R),
      u = F(o, s, N),
      c = F(l, s, R)
    return a.Cartesian3.cross(c, u, r), a.Cartesian3.normalize(r, r)
  }
  var z = new a.Cartographic(),
    H = new a.Cartesian3(),
    B = new a.Cartesian3(),
    j = new a.Cartesian3()
  function G(e, t, n, i, s, u, c, C, p, d, h) {
    if (0 !== s) {
      var g
      u === r.ArcType.GEODESIC ? (g = new o.EllipsoidGeodesic(e, t, c)) : u === r.ArcType.RHUMB && (g = new l.EllipsoidRhumbLine(e, t, c))
      var f = g.surfaceDistance
      if (!(f < s))
        for (var m = D(e, t, i, c, j), w = Math.ceil(f / s), v = f / w, y = v, M = w - 1, T = C.length, E = 0; E < M; E++) {
          var _ = g.interpolateUsingSurfaceDistance(y, z),
            O = Y(c, _, n, H),
            P = Y(c, _, i, B)
          a.Cartesian3.pack(m, C, T),
            a.Cartesian3.pack(O, p, T),
            a.Cartesian3.pack(P, d, T),
            h.push(_.latitude),
            h.push(_.longitude),
            (T += 3),
            (y += v)
        }
    }
  }
  var V = new a.Cartographic()
  function Y(e, t, n, i) {
    return a.Cartographic.clone(t, V), (V.height = n), a.Cartographic.toCartesian(V, e, i)
  }
  function F(e, t, n) {
    return a.Cartesian3.subtract(e, t, n), a.Cartesian3.normalize(n, n), n
  }
  function q(e, t, n, i) {
    return (i = F(e, t, i)), (i = a.Cartesian3.cross(i, n, i)), (i = a.Cartesian3.normalize(i, i)), (i = a.Cartesian3.cross(n, i, i))
  }
  ;(x.pack = function (e, t, i) {
    var r = n.defaultValue(i, 0),
      s = e._positions,
      o = s.length
    t[r++] = o
    for (var l = 0; l < o; ++l) {
      var u = s[l]
      a.Cartesian3.pack(u, t, r), (r += 3)
    }
    return (
      (t[r++] = e.granularity),
      (t[r++] = e.loop ? 1 : 0),
      (t[r++] = e.arcType),
      a.Ellipsoid.pack(e._ellipsoid, t, r),
      (r += a.Ellipsoid.packedLength),
      (t[r++] = e._projectionIndex),
      (t[r++] = e._scene3DOnly ? 1 : 0),
      t
    )
  }),
    (x.unpack = function (e, t, i) {
      for (var r = n.defaultValue(t, 0), s = e[r++], o = new Array(s), l = 0; l < s; l++) (o[l] = a.Cartesian3.unpack(e, r)), (r += 3)
      var u = e[r++],
        c = 1 === e[r++],
        C = e[r++],
        p = a.Ellipsoid.unpack(e, r)
      r += a.Ellipsoid.packedLength
      var d = e[r++],
        h = 1 === e[r++]
      return (
        n.defined(i) || (i = new x({ positions: o })),
        (i._positions = o),
        (i.granularity = u),
        (i.loop = c),
        (i.arcType = C),
        (i._ellipsoid = p),
        (i._projectionIndex = d),
        (i._scene3DOnly = h),
        i
      )
    })
  var X = new a.Cartesian3(),
    W = new a.Cartesian3(),
    U = new a.Cartesian3(),
    Z = new a.Cartesian3()
  function J(e, t, n, r, s) {
    var o = F(n, t, Z),
      l = q(e, t, o, X),
      u = q(r, t, o, W)
    if (i.CesiumMath.equalsEpsilon(a.Cartesian3.dot(l, u), -1, i.CesiumMath.EPSILON5))
      return (s = a.Cartesian3.cross(o, l, s)), (s = a.Cartesian3.normalize(s, s))
    ;(s = a.Cartesian3.add(u, l, s)), (s = a.Cartesian3.normalize(s, s))
    var c = a.Cartesian3.cross(o, s, U)
    return a.Cartesian3.dot(u, c) < 0 && (s = a.Cartesian3.negate(s, s)), s
  }
  var Q = p.Plane.fromPointNormal(a.Cartesian3.ZERO, a.Cartesian3.UNIT_Y),
    K = new a.Cartesian3(),
    $ = new a.Cartesian3(),
    ee = new a.Cartesian3(),
    ae = new a.Cartesian3(),
    te = new a.Cartesian3(),
    ne = new a.Cartesian3(),
    ie = new a.Cartographic(),
    re = new a.Cartographic(),
    se = new a.Cartographic()
  x.createGeometry = function (t) {
    var o,
      p,
      d,
      h,
      g,
      f,
      m = !t._scene3DOnly,
      w = t.loop,
      v = t._ellipsoid,
      y = t.granularity,
      M = t.arcType,
      T = new A[t._projectionIndex](v),
      E = 1e3,
      _ = t._positions,
      O = _.length
    2 === O && (w = !1)
    var b,
      k,
      S,
      x = new l.EllipsoidRhumbLine(void 0, void 0, v),
      I = [_[0]]
    for (p = 0; p < O - 1; p++)
      (d = _[p]),
        (h = _[p + 1]),
        (b = C.IntersectionTests.lineSegmentPlane(d, h, Q, ne)),
        !n.defined(b) ||
          a.Cartesian3.equalsEpsilon(b, d, i.CesiumMath.EPSILON7) ||
          a.Cartesian3.equalsEpsilon(b, h, i.CesiumMath.EPSILON7) ||
          (t.arcType === r.ArcType.GEODESIC
            ? I.push(a.Cartesian3.clone(b))
            : t.arcType === r.ArcType.RHUMB &&
              ((S = v.cartesianToCartographic(b, ie).longitude),
              (g = v.cartesianToCartographic(d, ie)),
              (f = v.cartesianToCartographic(h, re)),
              x.setEndPoints(g, f),
              (k = x.findIntersectionWithLongitude(S, se)),
              (b = v.cartographicToCartesian(k, ne)),
              !n.defined(b) ||
                a.Cartesian3.equalsEpsilon(b, d, i.CesiumMath.EPSILON7) ||
                a.Cartesian3.equalsEpsilon(b, h, i.CesiumMath.EPSILON7) ||
                I.push(a.Cartesian3.clone(b)))),
        I.push(h)
    w &&
      ((d = _[O - 1]),
      (h = _[0]),
      (b = C.IntersectionTests.lineSegmentPlane(d, h, Q, ne)),
      !n.defined(b) ||
        a.Cartesian3.equalsEpsilon(b, d, i.CesiumMath.EPSILON7) ||
        a.Cartesian3.equalsEpsilon(b, h, i.CesiumMath.EPSILON7) ||
        (t.arcType === r.ArcType.GEODESIC
          ? I.push(a.Cartesian3.clone(b))
          : t.arcType === r.ArcType.RHUMB &&
            ((S = v.cartesianToCartographic(b, ie).longitude),
            (g = v.cartesianToCartographic(d, ie)),
            (f = v.cartesianToCartographic(h, re)),
            x.setEndPoints(g, f),
            (k = x.findIntersectionWithLongitude(S, se)),
            (b = v.cartographicToCartesian(k, ne)),
            !n.defined(b) ||
              a.Cartesian3.equalsEpsilon(b, d, i.CesiumMath.EPSILON7) ||
              a.Cartesian3.equalsEpsilon(b, h, i.CesiumMath.EPSILON7) ||
              I.push(a.Cartesian3.clone(b)))))
    var N = I.length,
      R = new Array(N)
    for (p = 0; p < N; p++) {
      var z = a.Cartographic.fromCartesian(I[p], v)
      ;(z.height = 0), (R[p] = z)
    }
    if (!((N = (R = s.arrayRemoveDuplicates(R, a.Cartographic.equalsEpsilon)).length) < 2)) {
      var H = [],
        B = [],
        j = [],
        V = [],
        q = K,
        X = $,
        W = ee,
        U = ae,
        Z = te,
        oe = R[0],
        le = R[1]
      for (
        q = Y(v, R[N - 1], 0, q),
          U = Y(v, le, 0, U),
          X = Y(v, oe, 0, X),
          W = Y(v, oe, E, W),
          Z = w ? J(q, X, W, U, Z) : D(oe, le, E, v, Z),
          a.Cartesian3.pack(Z, B, 0),
          a.Cartesian3.pack(X, j, 0),
          a.Cartesian3.pack(W, V, 0),
          H.push(oe.latitude),
          H.push(oe.longitude),
          G(oe, le, 0, E, y, M, v, B, j, V, H),
          p = 1;
        p < N - 1;
        ++p
      ) {
        ;(q = a.Cartesian3.clone(X, q)), (X = a.Cartesian3.clone(U, X))
        var ue = R[p]
        Y(v, ue, E, W),
          Y(v, R[p + 1], 0, U),
          J(q, X, W, U, Z),
          (o = B.length),
          a.Cartesian3.pack(Z, B, o),
          a.Cartesian3.pack(X, j, o),
          a.Cartesian3.pack(W, V, o),
          H.push(ue.latitude),
          H.push(ue.longitude),
          G(R[p], R[p + 1], 0, E, y, M, v, B, j, V, H)
      }
      var Ce = R[N - 1],
        pe = R[N - 2]
      if (((X = Y(v, Ce, 0, X)), (W = Y(v, Ce, E, W)), w)) {
        var de = R[0]
        Z = J((q = Y(v, pe, 0, q)), X, W, (U = Y(v, de, 0, U)), Z)
      } else Z = D(pe, Ce, E, v, Z)
      if (
        ((o = B.length),
        a.Cartesian3.pack(Z, B, o),
        a.Cartesian3.pack(X, j, o),
        a.Cartesian3.pack(W, V, o),
        H.push(Ce.latitude),
        H.push(Ce.longitude),
        w)
      ) {
        for (G(Ce, oe, 0, E, y, M, v, B, j, V, H), o = B.length, p = 0; p < 3; ++p) (B[o + p] = B[p]), (j[o + p] = j[p]), (V[o + p] = V[p])
        H.push(oe.latitude), H.push(oe.longitude)
      }
      return (function (t, n, r, s, o, l, C) {
        var p,
          d,
          h,
          g,
          f,
          m,
          w = n._ellipsoid,
          v = r.length / 3 - 1,
          y = 8 * v,
          M = 4 * y,
          T = 36 * v,
          E = y > 65535 ? new Uint32Array(T) : new Uint16Array(T),
          _ = new Float64Array(3 * y),
          O = new Float32Array(M),
          b = new Float32Array(M),
          A = new Float32Array(M),
          k = new Float32Array(M),
          S = new Float32Array(M)
        C && ((h = new Float32Array(M)), (g = new Float32Array(M)), (f = new Float32Array(M)), (m = new Float32Array(2 * y)))
        var x = l.length / 2,
          I = 0,
          N = Me
        N.height = 0
        var R = Te
        R.height = 0
        var D = Ee,
          z = _e
        if (C)
          for (d = 0, p = 1; p < x; p++)
            (N.latitude = l[d]),
              (N.longitude = l[d + 1]),
              (R.latitude = l[d + 2]),
              (R.longitude = l[d + 3]),
              (D = n.project(N, D)),
              (z = n.project(R, z)),
              (I += a.Cartesian3.distance(D, z)),
              (d += 2)
        var H = s.length / 3
        z = a.Cartesian3.unpack(s, 0, z)
        var B,
          j = 0
        for (d = 3, p = 1; p < H; p++)
          (D = a.Cartesian3.clone(z, D)), (z = a.Cartesian3.unpack(s, d, z)), (j += a.Cartesian3.distance(D, z)), (d += 3)
        d = 3
        var G = 0,
          V = 0,
          Y = 0,
          q = 0,
          X = !1,
          W = a.Cartesian3.unpack(r, 0, Pe),
          U = a.Cartesian3.unpack(s, 0, _e),
          Z = a.Cartesian3.unpack(o, 0, Ae)
        if (t) {
          ce(Z, a.Cartesian3.unpack(r, r.length - 6, Oe), W, U) && (Z = a.Cartesian3.negate(Z, Z))
        }
        var J = 0,
          Q = 0,
          K = 0
        for (p = 0; p < v; p++) {
          var $,
            ee,
            ae,
            te,
            ne = a.Cartesian3.clone(W, Oe),
            ie = a.Cartesian3.clone(U, Ee),
            re = a.Cartesian3.clone(Z, be)
          if (
            (X && (re = a.Cartesian3.negate(re, re)),
            (W = a.Cartesian3.unpack(r, d, Pe)),
            (U = a.Cartesian3.unpack(s, d, _e)),
            (X = ce((Z = a.Cartesian3.unpack(o, d, Ae)), ne, W, U)),
            (N.latitude = l[G]),
            (N.longitude = l[G + 1]),
            (R.latitude = l[G + 2]),
            (R.longitude = l[G + 3]),
            C)
          ) {
            var se = ye(N, R)
            $ = n.project(N, Re)
            var oe = F((ee = n.project(R, De)), $, We)
            ;(oe.y = Math.abs(oe.y)),
              (ae = ze),
              (te = He),
              0 === se || a.Cartesian3.dot(oe, a.Cartesian3.UNIT_Y) > L
                ? ((ae = he(n, N, re, $, ze)), (te = he(n, R, Z, ee, He)))
                : 1 === se
                ? ((te = he(n, R, Z, ee, He)), (ae.x = 0), (ae.y = i.CesiumMath.sign(N.longitude - Math.abs(R.longitude))), (ae.z = 0))
                : ((ae = he(n, N, re, $, ze)), (te.x = 0), (te.y = i.CesiumMath.sign(N.longitude - R.longitude)), (te.z = 0))
          }
          var le = a.Cartesian3.distance(ie, U),
            ue = u.EncodedCartesian3.fromCartesian(ne, qe),
            Ce = a.Cartesian3.subtract(W, ne, Be),
            pe = a.Cartesian3.normalize(Ce, Ve),
            de = a.Cartesian3.subtract(ie, ne, je)
          de = a.Cartesian3.normalize(de, de)
          var ge = a.Cartesian3.cross(pe, de, Ve)
          ge = a.Cartesian3.normalize(ge, ge)
          var fe = a.Cartesian3.cross(de, re, Ye)
          fe = a.Cartesian3.normalize(fe, fe)
          var we = a.Cartesian3.subtract(U, W, Ge)
          we = a.Cartesian3.normalize(we, we)
          var ea = a.Cartesian3.cross(Z, we, Fe)
          ea = a.Cartesian3.normalize(ea, ea)
          var aa,
            ta,
            na,
            ia = le / j,
            ra = J / j,
            sa = 0,
            oa = 0,
            la = 0
          if (C) {
            ;(sa = a.Cartesian3.distance($, ee)), (aa = u.EncodedCartesian3.fromCartesian($, Xe)), (ta = a.Cartesian3.subtract(ee, $, We))
            var ua = (na = a.Cartesian3.normalize(ta, Ue)).x
            ;(na.x = na.y), (na.y = -ua), (oa = sa / I), (la = Q / I)
          }
          for (B = 0; B < 8; B++) {
            var ca = q + 4 * B,
              Ca = V + 2 * B,
              pa = ca + 3,
              da = B < 4 ? 1 : -1,
              ha = 2 === B || 3 === B || 6 === B || 7 === B ? 1 : -1
            a.Cartesian3.pack(ue.high, O, ca),
              (O[pa] = Ce.x),
              a.Cartesian3.pack(ue.low, b, ca),
              (b[pa] = Ce.y),
              a.Cartesian3.pack(fe, A, ca),
              (A[pa] = Ce.z),
              a.Cartesian3.pack(ea, k, ca),
              (k[pa] = ia * da),
              a.Cartesian3.pack(ge, S, ca)
            var ga = ra * ha
            0 === ga && ha < 0 && (ga = 9),
              (S[pa] = ga),
              C &&
                ((h[ca] = aa.high.x),
                (h[ca + 1] = aa.high.y),
                (h[ca + 2] = aa.low.x),
                (h[ca + 3] = aa.low.y),
                (f[ca] = -ae.y),
                (f[ca + 1] = ae.x),
                (f[ca + 2] = te.y),
                (f[ca + 3] = -te.x),
                (g[ca] = ta.x),
                (g[ca + 1] = ta.y),
                (g[ca + 2] = na.x),
                (g[ca + 3] = na.y),
                (m[Ca] = oa * da),
                0 === (ga = la * ha) && ha < 0 && (ga = 9),
                (m[Ca + 1] = ga))
          }
          var fa = Ie,
            ma = Ne,
            wa = Se,
            va = xe,
            ya = a.Rectangle.fromCartographicArray(ke, Le),
            Ma = P.getMinimumMaximumHeights(ya, w),
            Ta = Ma.minimumTerrainHeight,
            Ea = Ma.maximumTerrainHeight
          ;(K += Ta), (K += Ea), me(ne, ie, Ta, Ea, fa, wa), me(W, U, Ta, Ea, ma, va)
          var _a = a.Cartesian3.multiplyByScalar(ge, i.CesiumMath.EPSILON5, Ze)
          a.Cartesian3.add(fa, _a, fa),
            a.Cartesian3.add(ma, _a, ma),
            a.Cartesian3.add(wa, _a, wa),
            a.Cartesian3.add(va, _a, va),
            ve(fa, ma),
            ve(wa, va),
            a.Cartesian3.pack(fa, _, Y),
            a.Cartesian3.pack(ma, _, Y + 3),
            a.Cartesian3.pack(va, _, Y + 6),
            a.Cartesian3.pack(wa, _, Y + 9),
            (_a = a.Cartesian3.multiplyByScalar(ge, -2 * i.CesiumMath.EPSILON5, Ze)),
            a.Cartesian3.add(fa, _a, fa),
            a.Cartesian3.add(ma, _a, ma),
            a.Cartesian3.add(wa, _a, wa),
            a.Cartesian3.add(va, _a, va),
            ve(fa, ma),
            ve(wa, va),
            a.Cartesian3.pack(fa, _, Y + 12),
            a.Cartesian3.pack(ma, _, Y + 15),
            a.Cartesian3.pack(va, _, Y + 18),
            a.Cartesian3.pack(wa, _, Y + 21),
            (G += 2),
            (d += 3),
            (V += 16),
            (Y += 24),
            (q += 32),
            (J += le),
            (Q += sa)
        }
        d = 0
        var Oa = 0
        for (p = 0; p < v; p++) {
          for (B = 0; B < Ke; B++) E[d + B] = Qe[B] + Oa
          ;(Oa += 8), (d += Ke)
        }
        var Pa = Je
        e.BoundingSphere.fromVertices(r, a.Cartesian3.ZERO, 3, Pa[0]), e.BoundingSphere.fromVertices(s, a.Cartesian3.ZERO, 3, Pa[1])
        var ba = e.BoundingSphere.fromBoundingSpheres(Pa)
        ba.radius += K / (2 * v)
        var Aa = {
          position: new c.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, normalize: !1, values: _ }),
          startHiAndForwardOffsetX: $e(O),
          startLoAndForwardOffsetY: $e(b),
          startNormalAndForwardOffsetZ: $e(A),
          endNormalAndTextureCoordinateNormalizationX: $e(k),
          rightNormalAndTextureCoordinateNormalizationY: $e(S)
        }
        C &&
          ((Aa.startHiLo2D = $e(h)),
          (Aa.offsetAndRight2D = $e(g)),
          (Aa.startEndNormals2D = $e(f)),
          (Aa.texcoordNormalization2D = new c.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            normalize: !1,
            values: m
          })))
        return new c.Geometry({ attributes: Aa, indices: E, boundingSphere: ba })
      })(w, T, j, V, B, H, m)
    }
  }
  var oe = new a.Cartesian3(),
    le = new a.Matrix3(),
    ue = new e.Quaternion()
  function ce(t, n, r, s) {
    var o = F(r, n, oe),
      l = a.Cartesian3.dot(o, t)
    if (l > L || l < S) {
      var u = F(s, r, Z),
        c = l < S ? i.CesiumMath.PI_OVER_TWO : -i.CesiumMath.PI_OVER_TWO,
        C = e.Quaternion.fromAxisAngle(u, c, ue),
        p = a.Matrix3.fromQuaternion(C, le)
      return a.Matrix3.multiplyByVector(p, t, t), !0
    }
    return !1
  }
  var Ce = new a.Cartographic(),
    pe = new a.Cartesian3(),
    de = new a.Cartesian3()
  function he(e, t, n, r, s) {
    var o = a.Cartographic.toCartesian(t, e._ellipsoid, pe),
      l = a.Cartesian3.add(o, n, de),
      u = !1,
      c = e._ellipsoid,
      C = c.cartesianToCartographic(l, Ce)
    Math.abs(t.longitude - C.longitude) > i.CesiumMath.PI_OVER_TWO &&
      ((u = !0), (l = a.Cartesian3.subtract(o, n, de)), (C = c.cartesianToCartographic(l, Ce))),
      (C.height = 0)
    var p = e.project(C, s)
    return ((s = a.Cartesian3.subtract(p, r, s)).z = 0), (s = a.Cartesian3.normalize(s, s)), u && a.Cartesian3.negate(s, s), s
  }
  var ge = new a.Cartesian3(),
    fe = new a.Cartesian3()
  function me(e, t, n, i, r, s) {
    var o = a.Cartesian3.subtract(t, e, ge)
    a.Cartesian3.normalize(o, o)
    var l = n - 0,
      u = a.Cartesian3.multiplyByScalar(o, l, fe)
    a.Cartesian3.add(e, u, r)
    var c = i - 1e3
    ;(u = a.Cartesian3.multiplyByScalar(o, c, fe)), a.Cartesian3.add(t, u, s)
  }
  var we = new a.Cartesian3()
  function ve(e, t) {
    var n = p.Plane.getPointDistance(Q, e),
      r = p.Plane.getPointDistance(Q, t),
      s = we
    i.CesiumMath.equalsEpsilon(n, 0, i.CesiumMath.EPSILON2)
      ? ((s = F(t, e, s)), a.Cartesian3.multiplyByScalar(s, i.CesiumMath.EPSILON2, s), a.Cartesian3.add(e, s, e))
      : i.CesiumMath.equalsEpsilon(r, 0, i.CesiumMath.EPSILON2) &&
        ((s = F(e, t, s)), a.Cartesian3.multiplyByScalar(s, i.CesiumMath.EPSILON2, s), a.Cartesian3.add(t, s, t))
  }
  function ye(e, a) {
    var t = Math.abs(e.longitude),
      n = Math.abs(a.longitude)
    if (i.CesiumMath.equalsEpsilon(t, i.CesiumMath.PI, i.CesiumMath.EPSILON11)) {
      var r = i.CesiumMath.sign(a.longitude)
      return (e.longitude = r * (t - i.CesiumMath.EPSILON11)), 1
    }
    if (i.CesiumMath.equalsEpsilon(n, i.CesiumMath.PI, i.CesiumMath.EPSILON11)) {
      var s = i.CesiumMath.sign(e.longitude)
      return (a.longitude = s * (n - i.CesiumMath.EPSILON11)), 2
    }
    return 0
  }
  var Me = new a.Cartographic(),
    Te = new a.Cartographic(),
    Ee = new a.Cartesian3(),
    _e = new a.Cartesian3(),
    Oe = new a.Cartesian3(),
    Pe = new a.Cartesian3(),
    be = new a.Cartesian3(),
    Ae = new a.Cartesian3(),
    ke = [Me, Te],
    Le = new a.Rectangle(),
    Se = new a.Cartesian3(),
    xe = new a.Cartesian3(),
    Ie = new a.Cartesian3(),
    Ne = new a.Cartesian3(),
    Re = new a.Cartesian3(),
    De = new a.Cartesian3(),
    ze = new a.Cartesian3(),
    He = new a.Cartesian3(),
    Be = new a.Cartesian3(),
    je = new a.Cartesian3(),
    Ge = new a.Cartesian3(),
    Ve = new a.Cartesian3(),
    Ye = new a.Cartesian3(),
    Fe = new a.Cartesian3(),
    qe = new u.EncodedCartesian3(),
    Xe = new u.EncodedCartesian3(),
    We = new a.Cartesian3(),
    Ue = new a.Cartesian3(),
    Ze = new a.Cartesian3(),
    Je = [new e.BoundingSphere(), new e.BoundingSphere()],
    Qe = [0, 2, 1, 0, 3, 2, 0, 7, 3, 0, 4, 7, 0, 5, 4, 0, 1, 5, 5, 7, 4, 5, 6, 7, 5, 2, 6, 5, 1, 2, 3, 6, 2, 3, 7, 6],
    Ke = Qe.length
  function $e(e) {
    return new c.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 4, normalize: !1, values: e })
  }
  return (
    (x._projectNormal = he),
    function (e, a) {
      return P.initialize().then(function () {
        return n.defined(a) && (e = x.unpack(e, a)), x.createGeometry(e)
      })
    }
  )
})
