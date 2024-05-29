import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCourse } from '../UploadCourse/courseProvider';

export default function ComboboxDemo() {
  const { courseInfo, setCourseInfo } = useCourse();
  const frameworks = [
    {
      value: 'Web Developer',
      label: 'Web Developer',
    },
    {
      value: 'Marketing',
      label: 'Marketing',
    },
    {
      value: 'Javascript',
      label: 'Javascript',
    },
    {
      value: 'App Developer',
      label: 'App Developer',
    },
    {
      value: 'React',
      label: 'React',
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (name:string, value:any) => {
    setCourseInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSelect = (selectedValue:string) => {
    setValue(selectedValue === value ? '' : selectedValue);
    setOpen(false);

    handleChange('categories', selectedValue === value ? '' : selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="p-5 mt-4">
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between text-textgray">
          {value ? frameworks.find((framework) => framework.value === value)?.label : 'Select Category...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Select Category" />
          <CommandEmpty>No framework found.</CommandEmpty>

          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandList key={framework.value}>
                <CommandItem
                  value={framework.value}
                  onSelect={handleSelect}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  {framework.label}
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
