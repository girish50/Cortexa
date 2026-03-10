"use client";

import { useState } from "react";
import { MachineCard } from "@/components/machine-card";
import { DigitalTwinProfile } from "@/components/digital-twin-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Machine {
  id: string;
  name: string;
  type: string;
  healthScore: number;
  status: "online" | "offline" | "maintenance";
  energyUsage: string;
  lastMaintenance: string;
  location: string;
  model: string;
  serialNumber: string;
}

const sampleMachines: Machine[] = [
  {
    id: "1",
    name: "Cutting Machine #3",
    type: "CNC Cutting Machine",
    healthScore: 73,
    status: "online",
    energyUsage: "2.1 kW",
    lastMaintenance: "15 days ago",
    location: "Production Floor A",
    model: "CNC-X500",
    serialNumber: "CNC500-2023-001",
  },
  {
    id: "2",
    name: "Press Machine #1",
    type: "Hydraulic Press",
    healthScore: 91,
    status: "online",
    energyUsage: "3.8 kW",
    lastMaintenance: "8 days ago",
    location: "Production Floor B",
    model: "HP-2000X",
    serialNumber: "HP2000-2023-005",
  },
  {
    id: "3",
    name: "Lathe Machine #5",
    type: "CNC Lathe",
    healthScore: 67,
    status: "maintenance",
    energyUsage: "1.9 kW",
    lastMaintenance: "2 days ago",
    location: "Production Floor A",
    model: "LT-800",
    serialNumber: "LT800-2023-012",
  },
  {
    id: "4",
    name: "Assembly Line A",
    type: "Automated Assembly",
    healthScore: 88,
    status: "online",
    energyUsage: "5.2 kW",
    lastMaintenance: "12 days ago",
    location: "Assembly Hall",
    model: "AA-3000",
    serialNumber: "AA3000-2023-003",
  },
  {
    id: "5",
    name: "Welding Station #2",
    type: "Robotic Welder",
    healthScore: 95,
    status: "online",
    energyUsage: "2.7 kW",
    lastMaintenance: "5 days ago",
    location: "Welding Bay",
    model: "RW-450",
    serialNumber: "RW450-2023-008",
  },
  {
    id: "6",
    name: "Milling Machine #4",
    type: "CNC Milling Machine",
    healthScore: 82,
    status: "online",
    energyUsage: "2.3 kW",
    lastMaintenance: "10 days ago",
    location: "Production Floor B",
    model: "CM-600",
    serialNumber: "CM600-2023-015",
  },
];

export function Machines() {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredMachines = sampleMachines.filter((machine) => {
    const matchesSearch =
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedMachine) {
    return (
      <DigitalTwinProfile
        machine={selectedMachine}
        onBack={() => setSelectedMachine(null)}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Machines</h1>
        <p className="text-muted-foreground">
          Monitor and manage your industrial equipment
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search machines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "online" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("online")}
          >
            Online
          </Button>
          <Button
            variant={statusFilter === "maintenance" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("maintenance")}
          >
            Maintenance
          </Button>
        </div>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredMachines.map((machine) => (
          <MachineCard
            key={machine.id}
            {...machine}
            onClick={() => setSelectedMachine(machine)}
          />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-card rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Fleet Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {sampleMachines.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Machines</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {sampleMachines.filter((m) => m.status === "online").length}
            </div>
            <div className="text-sm text-muted-foreground">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {sampleMachines.filter((m) => m.status === "maintenance").length}
            </div>
            <div className="text-sm text-muted-foreground">In Maintenance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(
                sampleMachines.reduce((acc, m) => acc + m.healthScore, 0) /
                  sampleMachines.length,
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">
              Avg Health Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
