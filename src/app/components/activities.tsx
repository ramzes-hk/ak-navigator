import { getActivities } from "@/lib/activity_table";

function Activites() {
  return (
    <div>
      {getActivities().map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}

export default Activites;
