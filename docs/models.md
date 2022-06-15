# How to use magnify's models

_this is the documentation for the models defined at `src/magnify/apps/core/models.py`_

## Meeting

A meeting is a group a meetings defined reccursively. The attributes of a meeting are:

- `name`: the name of the meeting
- `start`: the date of the first meeting of the group
- `end`: the date of the last meeting of the group
- `held_on_<day_of_week>` (boolean): for each day of the week set to True between `start` and `end`, the meeting is held on that day
- `start_time`: the time the meeting is held
- `expected_duration`: the expected duration of the meeting

**Examples:**

```
{
    "name": "ComputerScienceClass",
    "start": "2020-01-01",
    "end": "2020-01-31",
    "held_on_monday": True,
    "held_on_tuesday": True,
    "held_on_wednesday": False,
    "held_on_thursday": False,
    "held_on_friday": True,
    "held_on_saturday": False,
    "held_on_sunday": False,
    "start_time": "10:00",
    "expected_duration": "2:00"
}
```

In this case, the class is held on Monday, Tuesday, Friday from 10:00 to 12:00 during the month of January 2020.

```
{
    "name": "ComputerScienceExam",
    "start": "2020-03-03",
    "end": "2020-03-03",
    "held_on_monday": False,
    "held_on_tuesday": True,
    "held_on_wednesday": False,
    "held_on_thursday": False,
    "held_on_friday": False,
    "held_on_saturday": False,
    "held_on_sunday": False,
    "start_time": "12:00",
    "expected_duration": "1:00"
}
```

This example is a single meeting held on March 3rd at 12:00.