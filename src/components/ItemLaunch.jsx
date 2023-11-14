export default function ItemLaunch({ item }) {
  const { name, date_local, success, links } = item;

  // Properties
  const image = links?.patch?.small;
  const friendlyDate = new Date(date_local).toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const launchSuccess = success ? "Yay ✅" : "Nay ❌";

  return (
    <tr className="item-launch">
      <td className="name-and-patch">
        <img src={image} />
        <span>{name}</span>
      </td>
      <td>{friendlyDate}</td>
      <td>{launchSuccess}</td>
    </tr>
  );
}
