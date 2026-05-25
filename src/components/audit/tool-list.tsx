import { Plus, PackageOpen } from "lucide-react";

import { ToolFields } from "@/components/audit/tool-fields";
import { Button } from "@/components/ui/button";

type ToolListProps = {
  tools: { instanceId: string; id: string }[];
  onAddTool: () => void;
  onRemoveTool: (instanceId: string) => void;
};

export function ToolList({
  tools,
  onAddTool,
  onRemoveTool,
}: ToolListProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">AI tools</h2>
          <p className="text-muted-foreground text-sm">
            Add each paid or evaluated AI tool used by the team.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={onAddTool}>
          <Plus className="size-4" aria-hidden="true" />
          Add tool
        </Button>
      </div>

      <div className="space-y-4">
        {tools.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="bg-muted mb-4 rounded-full p-3">
              <PackageOpen className="text-muted-foreground size-6" aria-hidden="true" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">No tools added</h3>
            <p className="text-muted-foreground mb-4 text-sm max-w-sm">
              You haven&apos;t added any AI tools yet. Add your first tool to begin calculating your estimated spend and potential savings.
            </p>
            <Button type="button" onClick={onAddTool}>
              <Plus className="mr-2 size-4" aria-hidden="true" />
              Add your first tool
            </Button>
          </div>
        ) : (
          tools.map((tool, index) => (
            <ToolFields
              key={tool.instanceId}
              index={index}
              canRemove={true}
              onRemove={() => onRemoveTool(tool.instanceId)}
            />
          ))
        )}
      </div>
    </div>
  );
}
