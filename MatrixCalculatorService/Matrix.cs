using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    public static class MatrixExtensions
    {
        static MatrixCalculator calc = new MatrixCalculator();

        public static Matrix Reverse(this Matrix A)
        {
            return new Matrix(calc.Reverse(A.Array));
        }

        public static Matrix Transpose(this Matrix A)
        {
            return new Matrix(calc.Transposing(A.Array));
        }
    }

    public class Matrix
    {
        static MatrixCalculator calc = new MatrixCalculator();

        public double[,] Array {get; set;}
        public int Rank { get; set; }
        public double Det { get; set; }

        public Matrix(double[,] A)
        {
            Array = A;
            Rank = A.GetLength(0);
            Det = MatrixCalculator.Determ(A);
        }

        public static Matrix operator + (Matrix A, Matrix B)
        {
            return new Matrix(calc.Add(A.Array, B.Array));
        }

        public static Matrix operator - (Matrix A, Matrix B)
        {
            return new Matrix(calc.Subtract(A.Array, B.Array));
        }

        public static Matrix operator * (Matrix A, Matrix B)
        {
            return new Matrix(calc.Mult(A.Array, B.Array));
        }

        public static Matrix operator / (Matrix A, Matrix B)
        {
            return new Matrix(calc.Divide(A.Array, B.Array));
        }

        public static Matrix operator * (Matrix A, double num)
        {
            return new Matrix(calc.MultBy(A.Array, num));
        }

        public static Matrix operator / (Matrix A, double num)
        {
            return new Matrix(calc.DivideBy(A.Array, num));
        }
    }
}
