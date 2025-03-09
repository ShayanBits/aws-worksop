"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateGym() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Add phone state
  const router = useRouter();

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/gyms", { 
      name, 
      location, 
      phone: phone || "N/A"  // ✅ Ensure phone is always included
    });
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Gym</h1>
      <Input placeholder="Gym Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <Input placeholder="Phone (Optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button onClick={handleSubmit}>Create</Button>
    </div>
  );
}