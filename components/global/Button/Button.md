### Standard button component

##### Default button

```jsx padded
<Button value="Click me!" />
```

##### Custom Button

```jsx padded
// Custom color
<Button value="Click me!" color="cyan-500" textColor="black" />
```

###### Button sizes

```jsx padded
<section className="flex flex-col">
  <section>
    <span className="px-4">Small:</span>
    <Button value="Click me!" size="sm" />
  </section>
  <section className="mt-2">
    <span className="px-4">Medium:</span>
    <Button value="Click me!" size="md" />
  </section>
  <section className="mt-2">
    <span className="px-4">Large:</span>
    <Button value="Click me!" size="lg" />
  </section>
</section>
```
