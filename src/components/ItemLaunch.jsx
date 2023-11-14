export default function ItemLaunch({ item }) {
  const { name, date_local, success } = item;

  // Properties
  const launchSuccess = success ? "Yay ✅" : "Nay ❌";

  return (
    <tr>
      <td>{name}</td>
      <td>{date_local}</td>
      <td>{launchSuccess}</td>
    </tr>
  );
}
