import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Sparkle } from "lucide-react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type CourseFormData = {
  name?: string;
  description?: string;
  chapters?: number;
  includeVideo?: boolean;
  difficulty?: string;
  category?: string;
};

const AddNewCourseDialog = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<CourseFormData>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onHandleInputChange = (field: keyof CourseFormData, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const onGenerate = async ()=>{
    console.log(formData);
    const courseId = uuidv4();
    try{
    setLoading(true);
    const result = await axios.post('/api/generate-course-layout', {
      ...formData,
      courseId : courseId
    })
    setLoading(false);
    console.log(result.data); 
    if(result.data.resp == 'limit exceed') {
      toast.warning('Please subscribe to plan!')
      router.push('/workspace/billing');
    }
    router.push('/workspace/edit-course/' + courseId)
  } catch(e) {
    setLoading(false); 
    console.log(e);
  }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label>Course Name</label>
                <Input
                  placeholder="Course Name"
                  className="mt-1"
                  onChange={(e) => onHandleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <label>Course Description (Optional)</label>
                <Textarea
                  placeholder="Course Description"
                  className="mt-1"
                  onChange={(e) => onHandleInputChange("description", e.target.value)}
                />
              </div>
              <div>
                <label>No. Of Chapters</label>
                <Input
                  placeholder="No. Of Chapters"
                  type="number"
                  className="mt-1"
                  onChange={(e) => onHandleInputChange("chapters", parseInt(e.target.value))}
                />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                  onCheckedChange={(checked) => onHandleInputChange("includeVideo", checked)}
                />
              </div>
              <div>
                <label>Difficulty Level</label>
                <Select onValueChange={(value) => onHandleInputChange("difficulty", value)}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input
                  placeholder="Category (Seperated by comma)"
                  className="mt-1"
                  onChange={(e) => onHandleInputChange("category", e.target.value)}
                />
              </div>
              <div>
                <Button
                  disabled={loading}
                  onClick={onGenerate}
                 className="w-full cursor-pointer bg-blue-600">
                  {loading? <Loader2Icon className="animate-spin"/> : 
                  <Sparkle /> }
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;
