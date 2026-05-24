fetch("http://localhost:3000/api/lead/capture", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com", shareId: "test-share-id" })
}).then(async res => {
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Body:", text);
}).catch(console.error);
