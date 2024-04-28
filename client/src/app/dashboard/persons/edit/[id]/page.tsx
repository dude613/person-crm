import { getPerson } from "@/actions/users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { EditPerson } from "@/components/dashboard/persons/EditPerson";
import { USER } from "@/types/USER";
import { getServerSession } from "next-auth";
type props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: props) => {
  const session = await getServerSession(authOptions);
  let person: USER | null = null;
  if (session?.user) {
    person = await getPerson(params.id, session?.user.token);
  }
  if (!person) return null;
  return (
    <div className=" mx-auto">
      <h1 className="text-center font-semibold text-3xl">Edit Person</h1>

      <br />
      <EditPerson person={person} />
    </div>
  );
};

export default page;
