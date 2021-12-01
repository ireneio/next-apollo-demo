import { Button, Grid, TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useAppDispatch } from "../../../store"
import { useAddTask } from "../services"
import AvailableUserSelect from "./AvailableUserSelect"

const TaskForm = () => {
  const { handleSubmit, formState, register, getValues, reset } = useFormContext()
  const [addTask] = useAddTask()
  const dispatch = useAppDispatch()

  const handleAddTask = async () => {
    await addTask({
      variables: {
        content: getValues('content'),
        editableBy: getValues('editableBy')
      },
      onCompleted: (data) => {
        if (data?.addTask) {
          dispatch({ type: 'PREPEND_TASK', payload: data.addTask })
          reset({ content: '', editableBy: [] })
        }
      }
    })
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          disabled={!formState.isValid || formState.isSubmitting}
          onClick={handleSubmit(handleAddTask)}
        >新增</Button>
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField label="內容" variant="outlined" {...register('content', { required: true })} />
      </Grid>
      <Grid item xs={6} sm={4}>
        <AvailableUserSelect />
      </Grid>
    </Grid>
  )
}

export default TaskForm
