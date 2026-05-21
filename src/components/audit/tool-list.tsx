import { Plus } from "lucide-react";

import { ToolFields } from "@/components/audit/tool-fields";
import { Button } from "@/components/ui/button";
import type { AiTool } from "@/types/audit";

type ToolListProps = {
  tools: AiTool[];
  onAddTool: () => void;
  onUpdateTool: (instanceId: string, tool: AiTool) => void;
  onRemoveTool: (instanceId: string) => void;
};

export function ToolList({
  tools,
  onAddTool,
  onUpdateTool,
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
        {tools.map((tool, index) => (
          <ToolFields
            key={tool.instanceId}
            index={index}
            value={tool}
            canRemove={tools.length > 1}
            onChange={(updatedTool) =>
              onUpdateTool(tool.instanceId, updatedTool)
            }
            onRemove={() => onRemoveTool(tool.instanceId)}
          />
        ))}
      </div>
    </div>
  );
}
