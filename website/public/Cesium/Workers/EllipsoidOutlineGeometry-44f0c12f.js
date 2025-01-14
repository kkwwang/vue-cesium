define([
  'exports',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6'
], function (i, t, e, a, n, r, o, s, m, u) {
  'use strict'
  var f = new a.Cartesian3(1, 1, 1),
    d = Math.cos,
    l = Math.sin
  function c(i) {
    i = r.defaultValue(i, r.defaultValue.EMPTY_OBJECT)
    var t = r.defaultValue(i.radii, f),
      e = r.defaultValue(i.innerRadii, t),
      o = r.defaultValue(i.minimumClock, 0),
      s = r.defaultValue(i.maximumClock, n.CesiumMath.TWO_PI),
      m = r.defaultValue(i.minimumCone, 0),
      u = r.defaultValue(i.maximumCone, n.CesiumMath.PI),
      d = Math.round(r.defaultValue(i.stackPartitions, 10)),
      l = Math.round(r.defaultValue(i.slicePartitions, 8)),
      c = Math.round(r.defaultValue(i.subdivisions, 128))
    ;(this._radii = a.Cartesian3.clone(t)),
      (this._innerRadii = a.Cartesian3.clone(e)),
      (this._minimumClock = o),
      (this._maximumClock = s),
      (this._minimumCone = m),
      (this._maximumCone = u),
      (this._stackPartitions = d),
      (this._slicePartitions = l),
      (this._subdivisions = c),
      (this._offsetAttribute = i.offsetAttribute),
      (this._workerName = 'createEllipsoidOutlineGeometry')
  }
  ;(c.packedLength = 2 * a.Cartesian3.packedLength + 8),
    (c.pack = function (i, t, e) {
      return (
        (e = r.defaultValue(e, 0)),
        a.Cartesian3.pack(i._radii, t, e),
        (e += a.Cartesian3.packedLength),
        a.Cartesian3.pack(i._innerRadii, t, e),
        (e += a.Cartesian3.packedLength),
        (t[e++] = i._minimumClock),
        (t[e++] = i._maximumClock),
        (t[e++] = i._minimumCone),
        (t[e++] = i._maximumCone),
        (t[e++] = i._stackPartitions),
        (t[e++] = i._slicePartitions),
        (t[e++] = i._subdivisions),
        (t[e] = r.defaultValue(i._offsetAttribute, -1)),
        t
      )
    })
  var C = new a.Cartesian3(),
    _ = new a.Cartesian3(),
    p = {
      radii: C,
      innerRadii: _,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
      offsetAttribute: void 0
    }
  ;(c.unpack = function (i, t, e) {
    t = r.defaultValue(t, 0)
    var n = a.Cartesian3.unpack(i, t, C)
    t += a.Cartesian3.packedLength
    var o = a.Cartesian3.unpack(i, t, _)
    t += a.Cartesian3.packedLength
    var s = i[t++],
      m = i[t++],
      u = i[t++],
      f = i[t++],
      d = i[t++],
      l = i[t++],
      h = i[t++],
      v = i[t]
    return r.defined(e)
      ? ((e._radii = a.Cartesian3.clone(n, e._radii)),
        (e._innerRadii = a.Cartesian3.clone(o, e._innerRadii)),
        (e._minimumClock = s),
        (e._maximumClock = m),
        (e._minimumCone = u),
        (e._maximumCone = f),
        (e._stackPartitions = d),
        (e._slicePartitions = l),
        (e._subdivisions = h),
        (e._offsetAttribute = -1 === v ? void 0 : v),
        e)
      : ((p.minimumClock = s),
        (p.maximumClock = m),
        (p.minimumCone = u),
        (p.maximumCone = f),
        (p.stackPartitions = d),
        (p.slicePartitions = l),
        (p.subdivisions = h),
        (p.offsetAttribute = -1 === v ? void 0 : v),
        new c(p))
  }),
    (c.createGeometry = function (i) {
      var o = i._radii
      if (!(o.x <= 0 || o.y <= 0 || o.z <= 0)) {
        var f = i._innerRadii
        if (!(f.x <= 0 || f.y <= 0 || f.z <= 0)) {
          var c = i._minimumClock,
            C = i._maximumClock,
            _ = i._minimumCone,
            p = i._maximumCone,
            h = i._subdivisions,
            v = a.Ellipsoid.fromCartesian3(o),
            y = i._slicePartitions + 1,
            k = i._stackPartitions + 1
          ;(y = Math.round((y * Math.abs(C - c)) / n.CesiumMath.TWO_PI)) < 2 && (y = 2),
            (k = Math.round((k * Math.abs(p - _)) / n.CesiumMath.PI)) < 2 && (k = 2)
          var b = 0,
            x = 1,
            A = f.x !== o.x || f.y !== o.y || f.z !== o.z,
            P = !1,
            w = !1
          A && ((x = 2), _ > 0 && ((P = !0), (b += y)), p < Math.PI && ((w = !0), (b += y)))
          var M,
            V,
            g,
            E,
            G = h * x * (k + y),
            O = new Float64Array(3 * G),
            D = 2 * (G + b - (y + k) * x),
            I = u.IndexDatatype.createTypedArray(G, D),
            T = 0,
            z = new Array(k),
            L = new Array(k)
          for (M = 0; M < k; M++) (E = _ + (M * (p - _)) / (k - 1)), (z[M] = l(E)), (L[M] = d(E))
          var R = new Array(h),
            N = new Array(h)
          for (M = 0; M < h; M++) (g = c + (M * (C - c)) / (h - 1)), (R[M] = l(g)), (N[M] = d(g))
          for (M = 0; M < k; M++) for (V = 0; V < h; V++) (O[T++] = o.x * z[M] * N[V]), (O[T++] = o.y * z[M] * R[V]), (O[T++] = o.z * L[M])
          if (A) for (M = 0; M < k; M++) for (V = 0; V < h; V++) (O[T++] = f.x * z[M] * N[V]), (O[T++] = f.y * z[M] * R[V]), (O[T++] = f.z * L[M])
          for (z.length = h, L.length = h, M = 0; M < h; M++) (E = _ + (M * (p - _)) / (h - 1)), (z[M] = l(E)), (L[M] = d(E))
          for (R.length = y, N.length = y, M = 0; M < y; M++) (g = c + (M * (C - c)) / (y - 1)), (R[M] = l(g)), (N[M] = d(g))
          for (M = 0; M < h; M++) for (V = 0; V < y; V++) (O[T++] = o.x * z[M] * N[V]), (O[T++] = o.y * z[M] * R[V]), (O[T++] = o.z * L[M])
          if (A) for (M = 0; M < h; M++) for (V = 0; V < y; V++) (O[T++] = f.x * z[M] * N[V]), (O[T++] = f.y * z[M] * R[V]), (O[T++] = f.z * L[M])
          for (T = 0, M = 0; M < k * x; M++) {
            var B = M * h
            for (V = 0; V < h - 1; V++) (I[T++] = B + V), (I[T++] = B + V + 1)
          }
          var S = k * h * x
          for (M = 0; M < y; M++) for (V = 0; V < h - 1; V++) (I[T++] = S + M + V * y), (I[T++] = S + M + (V + 1) * y)
          if (A) for (S = k * h * x + y * h, M = 0; M < y; M++) for (V = 0; V < h - 1; V++) (I[T++] = S + M + V * y), (I[T++] = S + M + (V + 1) * y)
          if (A) {
            var U = k * h * x,
              F = U + h * y
            if (P) for (M = 0; M < y; M++) (I[T++] = U + M), (I[T++] = F + M)
            if (w) for (U += h * y - y, F += h * y - y, M = 0; M < y; M++) (I[T++] = U + M), (I[T++] = F + M)
          }
          var W = new m.GeometryAttributes({
            position: new s.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: O })
          })
          if (r.defined(i._offsetAttribute)) {
            var Y = O.length,
              J = new Uint8Array(Y / 3),
              j = i._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1
            t.arrayFill(J, j),
              (W.applyOffset = new s.GeometryAttribute({
                componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: J
              }))
          }
          return new s.Geometry({
            attributes: W,
            indices: I,
            primitiveType: s.PrimitiveType.LINES,
            boundingSphere: e.BoundingSphere.fromEllipsoid(v),
            offsetAttribute: i._offsetAttribute
          })
        }
      }
    }),
    (i.EllipsoidOutlineGeometry = c)
})
