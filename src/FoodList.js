import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import find from 'lodash/fp/find'
import { containsFood } from './caloriesReducer'

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  })

const findFoodByID = foods => id =>
  find(
    food => food.id === id
    , foods
  )
const addRemoveFood = foods => addFood => removeFood => event => {
  const checked = event.target.checked
  const foodID = event.target.value
  const food = findFoodByID(foods)(foodID)
  if(checked) {
    return addFood(food)
  }
  return removeFood(food)
}

  const FoodList = ({ classes, calories, foods, addFood, removeFood }) => {
    
    return (
      <Paper className={classes.root} data-cy-foods-table>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Food (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                <Checkbox
                  data-cy-food-name={row.name}
                  checked={containsFood(calories.foods)(row.id)}
                  onChange={addRemoveFood(foods)(addFood)(removeFood)}
                  value={row.id}
                />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  
  export default withStyles(styles)(FoodList)