using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    public interface ICalculatorService
    {
        Matrix CreateMatrix(double[,] Array);

        Matrix Add(Matrix A, Matrix B);
        Matrix Subtract(Matrix A, Matrix B);
        Matrix Mult(Matrix A, Matrix B);
        Matrix Divide(Matrix A, Matrix B);

        Matrix Transposing(Matrix A);
        Matrix Reverse(Matrix A);
        Matrix MultBy(Matrix A, double number);
        Matrix DivideBy(Matrix A, double number);

        Matrix GetZeroMatrix(int size);
        Matrix GetIdentityMatrix(int size);
    }
}