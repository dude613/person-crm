import { getAllPersonCities, getAllPersonStates } from "src/actions/person";
import Persons from "src/components/dashboard/persons/Persons";
import { Suspense } from "react";

const page = async () => {
  const [cities, states] = await Promise.all([
    getAllPersonCities(),
    getAllPersonStates(),
  ]);

  return (
    <div className="">
      <h1 className="text-center text-3xl font-semibold">Persons</h1>
      <br />

      <Suspense>
        <Persons cities={cities as string[]} states={states as string[]} />
      </Suspense>
    </div>
  );
};

export default page;
