# satJS
A simple JS module for checking for collisions between two shapes using the Separating Axis Theorem  
*** ONLY WORKS FOR CONVEX SHAPES ***  

USAGE

1. Create two shapes using Vec2 for the vertices  
     e.g. &nbsp;&nbsp;&nbsp;&nbsp;const shapeA = new Shape([new Vec2(0,0), new Vec2(2,0), new Vec2(1,1)]);  
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const shapeB = new Shape([new Vec2(10,10), new Vec2(20,10), new Vec2(15,20)]);  
          
2. Use satModule's init function with the two shapes as arguments to check it the shapes are colliding  
   and if they are, to return the Minimum Translation Vector (i.e. the penetration depth and the  
   collision norm)  
     e.g  &nbsp;&nbsp;&nbsp;&nbsp;const ab = satModule.init(shapeA, shapeB);  
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ab.collision     ----> returns false  
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ab.penetation    ----> returns 0  
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ab.norm          ----> returns (0, 0) [Vec2 object]  
