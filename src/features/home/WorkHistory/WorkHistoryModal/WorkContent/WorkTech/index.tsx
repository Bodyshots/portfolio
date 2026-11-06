import { Wrench } from "lucide-react";

interface WorkTechProps {
  technologies: string[] | null;
}

const WorkTech = ({ technologies }: WorkTechProps) => {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-lg text-foreground">
        <Wrench className="w-5 h-5" />
        Technologies & Tools
      </h3>
      <div className="flex flex-wrap gap-2">
        {technologies ? (
          technologies.map((tech) => (
            <span
              key={crypto.randomUUID()}
              className="rounded-full border border-primary! bg-secondary px-3 py-1 text-xs text-foreground"
            >
              {tech}
            </span>
          ))
        ) : (
          <span className="text-left">
            No technologies available. Check back later!
          </span>
        )}
      </div>
    </div>
  );
};

export default WorkTech;
