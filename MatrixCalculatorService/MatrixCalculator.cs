using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    public class MatrixCalculator
    {
        //-------------------------------------------------------------------------
        public double[,] Add(double[,] A, double[,] B)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] + B[i, j];

            return C;
        }

        public double[,] Subtract(double[,] A, double[,] B)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] - B[i, j];

            return C;
        }

        public double[,] Mult(double[,] A, double[,] B)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    for (int z = 0; z < size; z++)
                        C[i, j] += A[i, z] * B[z, j];

            return C;
        }

        public double[,] Divide(double[,] A, double[,] B, out double det)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            C = Mult(A, Reverse(B, out det));

            return C;
        }


        //-------------------------------------------------------------------------
        public double[,] Reverse(double[,] A, out double det)
        {
            int size = A.GetLength(0);
            double[,] B = new double[size, size * 2];
            double[,] C = new double[size, size];

            det = Determ(A);
            if (det == 0)
                return C;

            for (int i = 0; i < size; i++)
            {
                B[i, i + size] = 1;
                for (int j = 0; j < size; j++)
                    B[i, j] += A[i, j];
            }

            double Bn = 0;
            double Bi = 0;

            for (int i = 0; i < size; i++)
            {
                Bi = B[i, i];
                for (int j = 0; j < size * 2; j++)
                {
                    B[i, j] /= Bi;
                }

                for (int k = 0; k < size; k++)
                {
                    if (k == i)
                        continue;

                    Bn = B[k, i];

                    for (int z = 0; z < size * 2; z++)
                        B[k, z] -= B[i, z] * Bn;
                }
            }

            for (int i = 0; i < size; i++)
                for (int j = size; j < size * 2; j++)
                    C[i, j - size] = B[i, j];

            return C;
        }

        public double[,] Transposing(double[,] A)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    C[j, i] += A[i, j];

            return C;
        }

        public double[,] MultBy(double[,] A, double number)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    C[i, j] = A[i, j] * number;

            return C;
        }

        public double[,] DivideBy(double[,] A, double number)
        {
            int size = A.GetLength(0);
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    C[i, j] = A[i, j] * 1 / number;

            return C;
        }


        //-------------------------------------------------------------------------
        public double[,] GetZeroMatrix(int size)
        {
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    C[i, j] = 0;

            return C;
        }

        public double[,] GetIdentityMatrix(int size)
        {
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                C[i, i] = 1;

            return C;
        }


        //-------------------------------------------------------------------------
        public static double[,] GetMinor(double[,] matrix, int row, int column)
        {
            if (matrix.GetLength(0) != matrix.GetLength(1)) throw new Exception(" Число строк в матрице не совпадает с числом столбцов");
            double[,] buf = new double[matrix.GetLength(0) - 1, matrix.GetLength(0) - 1];
            for (int i = 0; i < matrix.GetLength(0); i++)
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    if ((i != row) || (j != column))
                    {
                        if (i > row && j < column) buf[i - 1, j] = matrix[i, j];
                        if (i < row && j > column) buf[i, j - 1] = matrix[i, j];
                        if (i > row && j > column) buf[i - 1, j - 1] = matrix[i, j];
                        if (i < row && j < column) buf[i, j] = matrix[i, j];
                    }
                }
            return buf;
        }

        public static double Determ(double[,] matrix)
        {
            if (matrix.GetLength(0) != matrix.GetLength(1)) throw new Exception(" Число строк в матрице не совпадает с числом столбцов");
            double det = 0;
            int Rank = matrix.GetLength(0);
            if (Rank == 1) det = matrix[0, 0];
            if (Rank == 2) det = matrix[0, 0] * matrix[1, 1] - matrix[0, 1] * matrix[1, 0];
            if (Rank > 2)
            {
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    det += Math.Pow(-1, 0 + j) * matrix[0, j] * Determ(GetMinor(matrix, 0, j));
                }
            }
            return det;
        }

    }
}
