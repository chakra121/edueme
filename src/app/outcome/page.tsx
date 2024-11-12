import React from 'react'

const Outcome = () => {
  return (
    <div className="relative flex flex-col items-center px-32 py-20">
      {/* box */}
      <div className="rounded-xl bg-neutral-600 px-10">
        {/* items in box */}
        <div className="flex flex-col items-center p-8">
          <h1 className="p-4 text-3xl font-bold">
            Learning Outcomes of Robotics:
          </h1>
          <p className="p-3 text-center">
            Robots education is pleased to offer free interactive robotics
            presentations for your students!. These fun and hands-on robotics
            sessions will have your students marveling at what THEY can achieve.
            <br />
            <br />
            With a growing economy that has a higher demand for STEM fields,
            it’s important that the next generation learns how they can make a
            difference in their world. That’s why Edueme Research Labs offers a
            variety of classes and workshops that kids of all ages can enjoy.
            Robotics camps and classes give students the opportunity to dive
            deep into the world of robotics and explore how computer programming
            and robot design can solve problems big and small!.
            <br />
            <br />
            Not only do our robotics programs help to establish science,
            technology, engineering, and math concepts, they also work to build
            on students’ team-building skills as they work to complete fun
            challenges. These collaborative skills are essential for student
            success, no matter what subject they choose to pursue in the future.
          </p>
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 1</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 2</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 3</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 4</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 5</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 6</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 7</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 8</div>
    <div className="bg-neutral-500 font-semibold p-4 rounded">Text Item 9</div>
</div>

    </div>
  );
}

export default Outcome