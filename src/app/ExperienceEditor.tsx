"use client";

import { useState, useEffect } from "react";
import {
  Trash,
  Plus,
  ChevronUp,
  ChevronDown,
  MoveUp,
  MoveDown,
  Download,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardHeader, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import RichTextEditor from "@/components/RichTextEditor";
import { motion } from "framer-motion";
import { DatePicker } from "antd";

interface Experience {
  id: number;
  company: string;
  jobTitle: string;
  location: string;
  country: string;
  startDate: Date | null;
  endDate?: Date | null;
  currentlyWorking: boolean;
  description: string;
  expanded: boolean;
}

export default function ExperienceEditor() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const storedExperiences = localStorage.getItem("experiences");
    if (storedExperiences) {
      setExperiences(JSON.parse(storedExperiences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    sortExperiences(sortOrder);
  }, [sortOrder]);

  const sortExperiences = (order: "asc" | "desc") => {
    setExperiences((prev) =>
      [...prev].sort((a, b) =>
        a.startDate && b.startDate
          ? order === "asc"
            ? a.startDate.getTime() - b.startDate.getTime()
            : b.startDate.getTime() - a.startDate.getTime()
          : 0
      )
    );
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now(),
      company: "",
      jobTitle: "",
      location: "",
      country: "",
      startDate: null,
      endDate: null,
      currentlyWorking: false,
      description: "",
      expanded: true,
    };
    setExperiences((prev) => [...prev, newExperience]);
    sortExperiences(sortOrder);
  };

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: any
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const deleteExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const toggleExpand = (id: number) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, expanded: !exp.expanded } : exp
      )
    );
  };

  // Function to handle JSON download with correct format
const downloadjson = () => {
  const formattedExperiences = experiences.map((exp) => ({
    name: exp.company,
    location: `${exp.location}, ${exp.country}`,
    description: exp.description
      ? exp.description.replace(/<\/?[^>]+(>|$)/g, "").split("\n") // Convert HTML to text and split into array
      : [],
    position: exp.jobTitle,
    startDate: exp.startDate ? new Date(exp.startDate).getFullYear().toString() : "",
    endDate: exp.currentlyWorking
      ? "Present"
      : exp.endDate
      ? new Date(exp.endDate).getFullYear().toString()
      : "",
  }));

  const jsonString = JSON.stringify(formattedExperiences, null, 2); // Pretty-print JSON
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "experiences.json"; // File name
  a.click();
  URL.revokeObjectURL(url); // Clean up
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      {experiences.length === 0 ? (
        <Button
          onClick={addExperience}
          className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Start Adding Professional Experience
        </Button>
      ) : (
        <Card className="border rounded-xl shadow-lg bg-white w-full max-w-3xl">
          <CardHeader className="flex justify-between items-center p-5 bg-gray-200 rounded-t-xl">
            <div className="font-semibold text-gray-800 text-lg">
              Professional Experience
            </div>
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="ghost"
                title="Sort"
                onClick={toggleSort}
              >
                {sortOrder === "asc" ? (
                  <MoveUp className="w-5 h-5" />
                ) : (
                  <MoveDown className="w-5 h-5" />
                )}
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => setExperiences([])}
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-5">
            {experiences.map((exp) => (
              <Card
                key={exp.id}
                className="border rounded-lg shadow bg-white p-4"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-800">
                    {exp.company || "New Experience"}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      {exp.expanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteExperience(exp.id)}
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: exp.expanded ? "auto" : 0,
                    opacity: exp.expanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) =>
                        updateExperience(exp.id, "jobTitle", e.target.value)
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(exp.id, "location", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Country"
                        value={exp.country}
                        onChange={(e) =>
                          updateExperience(exp.id, "country", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <DatePicker
                        picker="month"
                        placeholder="Start Date"
                        onChange={(date) =>
                          updateExperience(
                            exp.id,
                            "startDate",
                            date ? date.toDate() : null
                          )
                        }
                      />
                      <DatePicker
                        picker="month"
                        placeholder="End Date"
                        disabled={exp.currentlyWorking}
                        onChange={(date) =>
                          updateExperience(
                            exp.id,
                            "endDate",
                            date ? date.toDate() : null
                          )
                        }
                      />
                    </div>
                    <Checkbox
                      checked={exp.currentlyWorking}
                      onCheckedChange={(checked) => {
                        updateExperience(exp.id, "currentlyWorking", checked);
                        updateExperience(
                          exp.id,
                          "endDate",
                          checked ? null : exp.endDate
                        );
                      }}
                    >
                      I currently work here
                    </Checkbox>
                    <RichTextEditor
                      content={exp.description}
                      onChange={(value) =>
                        updateExperience(exp.id, "description", value)
                      }
                    />
                  </div>
                </motion.div>
              </Card>
            ))}
          </CardContent>

          <div className="p-5 flex justify-between space-x-4">
            <Button
              onClick={addExperience}
              className="w-full flex items-center justify-center py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Experience
            </Button>
            <Button
              onClick={downloadjson} // Call the download function
              className="w-full flex items-center justify-center py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              <Download className="w-5 h-5 mr-2" /> Download JSON
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}