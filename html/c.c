#include <stdio.h>
int main()
{
    int a;
    printf("Enter the number for check prime or not prime : ");
    scanf("%d", &a);
    int k = 0;
    for (int i = 2; i < a; i++)
    {
        if (a % i == 0)
            k = 1;
    }
    if (k == 0)
    {
        printf("the given number is prime !");
    }
    else
    {
        printf("its not a prime number !");
    }

    return 0;
}