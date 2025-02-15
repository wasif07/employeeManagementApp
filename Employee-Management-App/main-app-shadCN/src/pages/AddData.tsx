import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Zod Schema for Validation
const employeeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.string().email("Invalid email format."),
  phone: z
    .string()
    .optional()
    .or(z.literal("")), // Optional phone number
  role: z.enum(["Developer", "Designer", "Manager"], {
    required_error: "Role is required.",
  }),
  joiningDate: z
    .string()
    .refine((date) => new Date(date) <= new Date(), {
      message: "Joining date must be a past or current date.",
    }),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const AddData: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeFormValues[]>([]);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: undefined,
      joiningDate: "",
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormValues> = async (data) => {
    setEmployees((prev) => [...prev, data]);
    console.log(employees);
    
    localStorage.setItem("employeeData", JSON.stringify(data));
    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();
    // navigate("/display-data");
  };

  const goToData = () => {
    navigate("/display-data");
  };

  return (
    <div className="displayemp"       
      >
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold">Employee Form</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} placeholder="Enter name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Role Field */}
            <div>
              <Label>Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Designer">Designer</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            {/* Joining Date Field */}
            <div>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input
                id="joiningDate"
                type="date"
                {...register("joiningDate")}
                placeholder="Enter joining date"
              />
              {errors.joiningDate && (
                <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={goToData} variant="secondary">
            Show Data
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
};

export default AddData;
