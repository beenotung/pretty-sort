# pretty-sort

sort string with awareness to tailing numeric value

## Example

To sort below folder name:

    Class 1
    Class 2
    Class 3
    Class 4
    Class 10
    Class 11
    Class 12
    Class 13
    Group 1
    Group 2
    Group 3
    Group 4
    Group 10
    Group 11
    Group 12
    
If we sort it by by default string comparision, we will get:

    Class 1
    Class 10
    Class 11
    Class 12
    Class 13
    Class 2
    Class 3
    Class 4
    Group 1
    Group 10
    Group 11
    Group 12
    Group 2
    Group 3
    Group 4

This algorithm will extract the numeric value in the tailing of string,
and sort the element by the prefix, then the numeric value.
