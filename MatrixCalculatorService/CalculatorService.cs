using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    public class CalculatorService : ICalculatorService
    {
        public static MatrixCalculator calc = new MatrixCalculator();

        public Matrix Add(Matrix A, Matrix B)
        {
            return A + B;
        }

        public Matrix CreateMatrix(double[,] Array)
        {
            return new Matrix(Array);
        }

        public Matrix Divide(Matrix A, Matrix B)
        {
            return A / B;
        }

        public Matrix DivideBy(Matrix A, double number)
        {
            return A / number;
        }

        public Matrix GetIdentityMatrix(int size)
        {
            return new Matrix(calc.GetIdentityMatrix(size));
        }

        public Matrix GetZeroMatrix(int size)
        {
            return new Matrix(calc.GetZeroMatrix(size));
        }

        public Matrix Mult(Matrix A, Matrix B)
        {
            return A * B;
        }

        public Matrix MultBy(Matrix A, double number)
        {
            return A * number;
        }

        public Matrix Reverse(Matrix A)
        {
            return A.Reverse();
        }

        public Matrix Subtract(Matrix A, Matrix B)
        {
            return A - B;
        }

        public Matrix Transposing(Matrix A)
        {
            return A.Transpose();
        }
    }
}
