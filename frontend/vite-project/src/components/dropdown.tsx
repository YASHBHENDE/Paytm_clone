import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import type { user } from "./searchbar"
import { useNavigate } from "react-router-dom"

interface UserCommandProps {
  payeeNames: user[]
}

export function UserCommand({ payeeNames }: UserCommandProps) {
  const navigate = useNavigate()

  return (
    <Command className="w-1/2 rounded-lg border mt-2">
      

      <CommandList>
        <CommandEmpty>No users found.</CommandEmpty>

        <CommandGroup heading="Users">
          {payeeNames.map((payee) => (
            <CommandItem
              key={payee._id}
              onSelect={() =>
                navigate(
                  `/send?toUser=${payee._id}&Username=${payee.username}`
                )
              }
            >
              {payee.username}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
