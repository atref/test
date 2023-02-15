function roughSvgRender(eng) {
    let br = eng.beginRender;
    eng.beginRender = function() {
        br.call(eng);
        eng._roughCtx = rough.svg(eng._svg, { 
            options: {
                fillStyle: fillStyle,
                fillWeight: 1
            } 
        });
    }

    eng.drawRect = function (x, y, w, h, className, style, clipPath) {
        drawRect(eng, x, y, w, h, className, style, clipPath);
    };
    eng.drawPieSegment = function (cx, cy, r, startAngle, sweepAngle, className, style, clipPath) {
        drawPieSegment(eng, cx, cy, r, startAngle, sweepAngle, className, style, clipPath);
    };
    eng.drawLine = function (x1, y1, x2, y2, className, style) {
        drawLine(eng, x1, y1, x2, y2, className, style);
    }
    eng.drawLines = function (xs, ys, className, style, clipPath) {
        drawLines(eng, xs, ys, className, style, clipPath);
    }
    eng.drawPolygon = function (xs, ys, className, style, clipPath) {
        drawPolygon(eng, xs, ys, className, style, clipPath);
    }
    eng.drawEllipse = function (cx, cy, rx, ry, className, style) {
        drawEllipse(eng, cx, cy, rx, ry, className, style);
    }
}

function drawRect(eng, x, y, w, h, className, style, clipPath) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    // eng._applyColor(rect, 'fill', eng._fill);
    // eng._applyColor(rect, 'stroke', eng._stroke);
    // if (eng._strokeWidth) {
    //     rect.setAttribute('stroke-width', eng._strokeWidth.toString());
    // }
    // rect.setAttribute('x', x.toFixed(1));
    // rect.setAttribute('y', y.toFixed(1));
    // if (w > 0 && w < 0.05) {
    //     rect.setAttribute('width', '0.1');
    // } else {
    //     rect.setAttribute('width', w.toFixed(1));
    // }
    // if (h > 0 && h < 0.05) {
    //     rect.setAttribute('height', '0.1');
    // } else {
    //     rect.setAttribute('height', h.toFixed(1));
    // }

    const rc = eng._roughCtx;
    rect = rc.rectangle(x, y, w, h, { fill: eng._fill, stroke: eng._stroke, strokeWidth: 2 });

    if (clipPath) {
        eng._setClipPath(rect, clipPath);
    }

    if (className) {
        rect.setAttribute('class', className);
    }
    eng._applyStyle(rect, style);
    eng._appendChild(rect);

    return rect;
}

function drawPieSegment(eng, cx, cy, r, startAngle, sweepAngle, className, style, clipPath) {
    if (sweepAngle >= Math.PI * 2) {
        return eng.drawEllipse(cx, cy, r, r, className, style);
    } 

    // var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // eng._applyColor(path, 'fill', eng._fill);
    // eng._applyColor(path, 'stroke', eng._stroke);
    // if (eng._strokeWidth !== null) {
    //     path.setAttribute('stroke-width', eng._strokeWidth.toString());
    // }

    var p1 = new wijmo.Point(cx, cy);
    p1.x += r * Math.cos(startAngle);
    p1.y += r * Math.sin(startAngle);

    var a2 = startAngle + sweepAngle;
    var p2 = new wijmo.Point(cx, cy);
    p2.x += r * Math.cos(a2);
    p2.y += r * Math.sin(a2);

    var opt = ' 0 0,1 ';
    if (Math.abs(sweepAngle) > Math.PI) {
        opt = ' 0 1,1 ';
    }

    var d = 'M ' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1);
    d += ' A ' + r.toFixed(1) + ',' + r.toFixed(1) + opt;
    d += p2.x.toFixed(1) + ',' + p2.y.toFixed(1);
    d += ' L ' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' z';

    // path.setAttribute('d', d);

    const rc = eng._roughCtx;
    path = rc.path( d, { fill: eng._fill, stroke: eng._stroke, strokeWidth: 2 });

    if (clipPath) {
        eng._setClipPath(path, clipPath);
    }

    if (className) {
        path.setAttribute('class', className);
    }
    eng._applyStyle(path, style);

    eng._appendChild(path);

    return path;
}

function drawLine(eng, x1, y1, x2, y2, className, style) {
    //var line = document.createElementNS(SvgRenderEngine.svgNS, 'line');
    //this._applyColor(line, 'stroke', this._stroke);
    //if (this._strokeWidth !== null) {
    //    line.setAttribute('stroke-width', this._strokeWidth.toString());
    //}
    //line.setAttribute('x1', x1.toFixed(1));
    //line.setAttribute('x2', x2.toFixed(1));
    //line.setAttribute('y1', y1.toFixed(1));
    //line.setAttribute('y2', y2.toFixed(1));

    const rc = eng._roughCtx;
    line = rc.line(x1, y1, x2, y2, { stroke:eng._stroke , strokeWidth: 0.5*eng._strokeWidth, roughness: 1, bowing: 1});

    if (className) {
        line.setAttribute('class', className);
    }
    eng._applyStyle(line, style);

    eng._appendChild(line);

    return line;
}

function drawLines(eng, xs, ys, className, style, clipPath) {
    if (xs && ys) {
        var len = Math.min(xs.length, ys.length);
        if (len > 0) {
            let pts = [];
            for (var i = 0; i < len; i++) {
                pts.push( [xs[i],ys[i]]);
            }
            const rc = eng._roughCtx;
            pline = rc.linearPath( pts, { stroke:eng._stroke, strokeWidth: eng._strokeWidth});

            if (className) {
                pline.setAttribute('class', className);
            }
            if (clipPath) {
                //eng._setClipPath(pline, clipPath);
            }
            eng._applyStyle(pline, style);
            eng._appendChild(pline);
            return pline;
        }
    }
    return null;
}

function drawPolygon(eng, xs, ys, className, style, clipPath) {
    if (xs && ys) {
        var len = Math.min(xs.length, ys.length);
        if (len > 0) {
            let pts = [];
            for (var i = 0; i < len; i++) {
                pts.push( [ Math.round(xs[i]),Math.round(ys[i])]);
            }
            const rc = eng._roughCtx;
            poly = rc.polygon( pts, { fill: eng._fill, stroke:eng._stroke, strokeWidth:1 });
            //poly = rc.polygon( pts, { fill: eng._fill });
            //poly = rc.polygon( pts, { fill: 'red'/*eng._fill*/, /*stroke:eng._stroke, strokeWidth: eng._strokeWidth,*/
            //roughness:0, bowing:0, fillStyle:'dots'});

            if (className) {
                poly.setAttribute('class', className);
            }
            if (clipPath) {
                eng._setClipPath(poly, clipPath);
            }
            //eng._applyStyle(poly, style);
            eng._appendChild(poly);
            return poly;
        }
    }
    return null;
}

function drawEllipse(eng, cx, cy, rx, ry, className, style) {
    const rc = eng._roughCtx;
    ell = rc.ellipse(cx, cy, 2*rx, 2*ry, { fill:eng._fill, stroke:eng._stroke});
    if (className) {
        ell.setAttribute('class', className);
    }
    eng._applyStyle(ell, style);
    eng._appendChild(ell);
    return ell;
}
