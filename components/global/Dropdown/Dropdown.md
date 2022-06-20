### Standard dropdown component

##### Default dropdown

```jsx padded
const dropdownExample = [
  {
    value: 'About',
    href: '/about',
    selected: true,
  },
  {
    value: 'Services',
    href: '/services',
    disabled: true,
  }
  {
    value: 'Contact',
    href: '/contact',
  }
]

<Dropdown title="Menu" options={dropdownExample} />
```

##### Default dropdown right

```jsx padded
const dropdownExample = [
  {
    value: 'About',
    href: '/about',
    selected: true,
  },
  {
    value: 'Services',
    href: '/services',
    disabled: true,
  }
  {
    value: 'Contact',
    href: '/contact',
  }
]

<Dropdown title="Menu" options={dropdownExample} orientation='right' />
```

##### Default dropdown with left icon

```jsx padded
import BedIcon from 'public/icons/assets/bed.svg';

const dropdownExample = [
  {
    value: 'About',
    href: '/about',
    selected: true,
  },
  {
    value: 'Services',
    href: '/services',
    disabled: true,
  }
  {
    value: 'Contact',
    href: '/contact',
  }
]

<Dropdown title="Menu" options={dropdownExample} leftIcon={<BedIcon />} />
```

##### Default dropdown with right icon

```jsx padded
import BedIcon from 'public/icons/assets/bed.svg';

const dropdownExample = [
  {
    value: 'About',
    href: '/about',
    selected: true,
  },
  {
    value: 'Services',
    href: '/services',
    disabled: true,
  }
  {
    value: 'Contact',
    href: '/contact',
  }
]

<Dropdown title="Menu" options={dropdownExample} rightIcon={<BedIcon />} />
```


##### Dropdown with left icons on each option

```jsx padded
import BedIcon from 'public/icons/assets/bed.svg';

const dropdownExample = [
  {
    value: 'About',
    href: '/about',
    leftIcon: <BedIcon />,
  },
  {
    value: 'Services',
    href: '/services',
    leftIcon: <BedIcon />,
  }
]

<Dropdown title="Menu" options={dropdownExample} />
```

##### Dropdown with right icons on each option

```jsx padded
import BedIcon from 'public/icons/assets/bed.svg';

const dropdownExample = [
  {
    value: 'About',
    href: '/about',
    rightIcon: <BedIcon />,
  },
  {
    value: 'Services',
    href: '/services',
    rightIcon: <BedIcon />,
  }
]

<Dropdown title="Menu" options={dropdownExample} />
```

##### Dropdown with checkboxes on each option

```jsx padded
import BedIcon from 'public/icons/assets/bed.svg';

const [something, setSomething] = useState(false);
const [something2, setSomething2] = useState(false);

const dropdownExample = [
  {
    value: 'Placeholder 1',
    checkboxValue: something,
    checkboxName: 'option-1',
    checkboxMethod: (e) => setSomething(e),
  },
  {
    value: 'Placeholder 2',
    checkboxValue: something2,
    checkboxName: 'option-2',
    checkboxMethod: (e) => setSomething2(e),
  },
]

<Dropdown title="Menu" options={dropdownExample} />
```
