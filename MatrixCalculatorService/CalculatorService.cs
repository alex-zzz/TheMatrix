using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    public class CalculatorService : ICalculatorService
    {
        public static CalculatorService calc = new CalculatorService();

        public Matrix Add(Matrix A, Matrix B)
        {
            return A + B;
        }

        public Matrix CreateMatrix(double[,] Array)
        {
            return new Matrix(Array);
        }

        public Matrix Divide(Matrix A, Matrix B, out double det)
        {
            det = 0;
            return A / B;
        }

        public Matrix DivideBy(Matrix A, double number)
        {
            return A / number;
        }

        public Matrix GetIdentityMatrix(int size)
        {
            return calc.GetIdentityMatrix(size);
        }

        public Matrix GetZeroMatrix(int size)
        {
            return calc.GetZeroMatrix(size);
        }

        public Matrix Mult(Matrix A, Matrix B)
        {
            return A * B;
        }

        public Matrix MultBy(Matrix A, double number)
        {
            return A * number;
        }

        public Matrix Reverse(Matrix A, out double det)
        {
            det = 0;
            return A.Reverse();
        }

        public Matrix Subtract(Matrix A, Matrix B)
        {
            return A / B;
        }

        public Matrix Transposing(Matrix A)
        {
            return A.Transpose();
        }
    }
}
