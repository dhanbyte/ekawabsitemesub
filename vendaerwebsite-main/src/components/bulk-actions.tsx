'use client';

import { useState } from 'react';
import { MoreHorizontal, Download, Trash2, Edit, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

interface BulkActionsProps {
  selectedItems: string[];
  onClearSelection: () => void;
  onBulkDelete?: (ids: string[]) => void;
  onBulkEdit?: (ids: string[]) => void;
  onBulkExport?: (ids: string[]) => void;
  itemType?: string;
}

export function BulkActions({
  selectedItems,
  onClearSelection,
  onBulkDelete,
  onBulkEdit,
  onBulkExport,
  itemType = 'items'
}: BulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (selectedItems.length === 0) {
    return null;
  }

  const handleBulkDelete = () => {
    onBulkDelete?.(selectedItems);
    setShowDeleteDialog(false);
    onClearSelection();
  };

  const handleBulkEdit = () => {
    onBulkEdit?.(selectedItems);
  };

  const handleBulkExport = () => {
    onBulkExport?.(selectedItems);
  };

  return (
    <>
      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
        <Badge variant="secondary" className="gap-1">
          <CheckSquare className="h-3 w-3" />
          {selectedItems.length} selected
        </Badge>
        
        <div className="flex items-center gap-1">
          {onBulkExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkExport}
              className="gap-1"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
          )}
          
          {onBulkEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkEdit}
              className="gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}
          
          {onBulkDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="gap-1 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClearSelection}>
                Clear Selection
              </DropdownMenuItem>
              <DropdownMenuItem>
                Select All
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Mark as Active
              </DropdownMenuItem>
              <DropdownMenuItem>
                Mark as Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              {selectedItems.length} {itemType} from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete {selectedItems.length} {itemType}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}