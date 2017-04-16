/**
 * Created by vanessanehruji on 16/04/2017.
 */

// USAGE
//
// 1. Create two shapes using Vec2 for the vertices
//      e.g. const shapeA = new Shape([new Vec2(0,0), new Vec2(2,0), new Vec2(1,1)]);
//           const shapeB = new Shape([new Vec2(10,10), new Vec2(20,10), new Vec2(15,20)]);
//
// 2. Use satModule's init function with the two shapes as arguments to check it the shapes are colliding
//    and if they are, to return the Minimum Translation Vector (i.e. the penetration depth and the
//    collision norm)
//      e.g const ab = satModule.init(shapeA, shapeB);
//          ab.collision     ----> returns false
//          ab.penetation    ----> returns 0
//          ab.norm          ----> returns (0, 0) [Vec2 object]


function Vec2(x, y) {
    this.x = x;
    this.y = y;
}

function Shape(vertices){
    this.vertexArray = vertices;
}

function MTV (collision, penetration, norm) {
    this.collision = collision;
    this.penetration = penetration;
    this.norm = norm;
}

const satModule = (function() {


    const isSeparating = function(shapeA, shapeB){
        let mtv = new MTV(false, 100000, new Vec2(0, 0));
        const normsA = findShapeNormals(shapeA);
        const normsB = findShapeNormals(shapeB);
        const norms = normsA.concat(normsB);

        norms.every(function(norm) { // Don't use forEach - cannot break out of it
            // x is minimum projection, y is maximum projection
            const minmaxA = projectShapeOnAxis(norm, shapeA);
            const minmaxB = projectShapeOnAxis(norm, shapeB);

            if(minmaxB.y < minmaxA.x || minmaxA.y < minmaxB.x){
                // There is a separating axis - EXIT
                mtv.penetration = 0;
                return false; // Only exits the for loop, not the function.
            }
            else { // get the overlap if it is intersecting
                mtv.collision = true;

                // Find the amount that the two shapes overlap by on a particular axis.
                // If it is smaller than the current smallest penetration,
                // then set it as the new penetration depth and set the collision norm.

                let o = minmaxB.y > minmaxA.x ? (minmaxB.y - minmaxA.x) : (minmaxA.y - minmaxB.x); // +ve value
                console.log(o);
                if (o < mtv.penetration) {
                    mtv.penetration = o;
                    mtv.norm = norm;
                }
            }
        });

        return mtv;
    };



    const projectShapeOnAxis = function(norm, shape) {

        const v0 = shape.vertexArray[0];
        let min = projectVertexOnAxis(norm, v0);
        let max = min;

        shape.vertexArray.forEach( function(vertex) {
            let p = projectVertexOnAxis(norm, vertex);
            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        });

        return new Vec2(min, max);
    };



    const projectVertexOnAxis = function(norm, vertex) {
        const normalise = 1 / Math.sqrt(Math.pow(norm.x, 2) + Math.pow(norm.y, 2));
        return normalise * (norm.x * vertex.x + norm.y * vertex.y);
    };



    const findShapeNormals = function(shape){
        let arr = [];
        for (let i = 0; i < shape.vertexArray.length; i++){
            let edge = i + 1 < shape.vertexArray.length ?
                new Vec2(shape.vertexArray[i].x - shape.vertexArray[i + 1].x, shape.vertexArray[i].y - shape.vertexArray[i + 1].y)
                : new Vec2(shape.vertexArray[i].x - shape.vertexArray[0].x, shape.vertexArray[i].y - shape.vertexArray[0].y);
            arr.push(new Vec2(-1 * edge.y, 1 * edge.x));
        }
        return arr;
    };

    return {
        init :   isSeparating
    }

})();