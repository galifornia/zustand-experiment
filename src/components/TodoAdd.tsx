import * as React from 'react';
import { Button, Input, Grid } from '@chakra-ui/react';
import useStore from '../store';

function TodoAdd() {
  const newTodo = useStore((state) => state.newTodo);
  const setNewTodo = useStore((state) => state.setNewTodo);
  const addTodo = useStore((state) => state.addTodo);

  return (
    <Grid pt={2} templateColumns='5fr 1fr' columnGap='3'>
      <Input
        placeholder='New todo'
        value={newTodo}
        onChange={(ev) => setNewTodo(ev.target.value)}
      />
      <Button onClick={(ev) => addTodo()}>Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;
