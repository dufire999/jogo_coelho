class Link{
    constructor(bodyA, bodyB){
        let lastlink = bodyA.body.bodies.length -2;
        this.link = Constraint.create(
            {
                bodyA: bodyA.body.bodies[lastlink],
                pointA:{
                    x: 0, y:0
                },
                bodyB: bodyB,
                pointB: {x:0, y:0},
                length: -10,
                stiffness: 0.01

            }
        );
        World.add(engine.world, this.link);
    }
    separate(){
        World.remove(engine.world, this.link);
    }
}