using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    interface ICalculatorService
    {
        double[,] Add(double[,] A, double[,] B);
        double[,] Subtract(double[,] A, double[,] B);
        double[,] Mult(double[,] A, double[,] B);
        double[,] Divide(double[,] A, double[,] B);

        double[,] Transposing(double[,] A);
        double[,] Reverse(double[,] A);
        double[,] MultOn(double[,] A, double number);
        double[,] DivideOn(double[,] A, double number);

        double[,] GetZeroMatrix(int size);
        double[,] GetIdentityMatrix(int size);
    }
}
