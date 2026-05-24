fetch("http://localhost:3000/api/audit/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ payload: {test: "test"}, engineResult: {test: "test"} })
}).then(async res => {
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Body:", text);
}).catch(console.error);
