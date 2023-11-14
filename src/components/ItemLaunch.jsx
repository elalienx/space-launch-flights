export default function ItemLaunch({ item }) {
  const { name, date_local, success } = item;

  // Properties
  const friendlyDate = new Date(date_local).toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const launchSuccess = success ? "Yay ✅" : "Nay ❌";

  return (
    <tr>
      <td>{name}</td>
      <td>{friendlyDate}</td>
      <td>{launchSuccess}</td>
    </tr>
  );
}
