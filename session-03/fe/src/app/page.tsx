"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Gym {
  id: string;
  name: string;
  location: string;
}

export default function Home() {
  const [gyms, setGyms] = useState<Gym[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/gyms").then((res) => setGyms(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gym List</h1>
      <Link href="/create">
        <Button className="mb-4">Add New Gym</Button>
      </Link>
      <div className="grid grid-cols-3 gap-4">
        {gyms.map((gym) => (
          <Card key={gym.id}>
            <CardContent className="pt-6">
              <h2 className="text-lg font-bold">{gym.name}</h2>
              <p>{gym.location}</p>
              <Link href={`/gym/${gym.id}`}>
                <Button variant="outline" className="mt-2">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}