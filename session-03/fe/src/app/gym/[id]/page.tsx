"use client"; // ✅ Ensure it's a Client Component

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GymDetail() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Correct way to get the ID in Next.js 13+

  const [gym, setGym] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return; // ✅ Prevent errors when ID is missing

    axios
      .get(`http://localhost:3000/gyms/${id}`)
      .then((res) => {
        setGym(res.data);
        setName(res.data.name || "");
        setLocation(res.data.location || "");
        setPhone(res.data.phone || "N/A");
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load gym details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!gym) return <p className="text-center text-gray-500">Gym not found.</p>;

  const handleUpdate = async () => {
    await axios.put(`http://localhost:3000/gyms/${id}`, { name, location, phone });
    router.push("/");
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/gyms/${id}`);
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit Gym</h1>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Gym Name" />
      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <Button onClick={handleUpdate}>Update</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </div>
  );
}