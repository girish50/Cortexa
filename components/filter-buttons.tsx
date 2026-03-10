"use client"

import { Button } from "@/components/ui/button"

interface FilterButtonsProps {
  options: string[]
  selected: string
  onSelect: (option: string) => void
}

export function FilterButtons({ options, selected, onSelect }: FilterButtonsProps) {
  return (
    <div className="flex gap-1 bg-card rounded-lg p-1">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? "default" : "ghost"}
          size="sm"
          className={
            selected === option
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }
          onClick={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
