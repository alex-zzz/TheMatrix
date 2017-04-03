using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatrixCalculatorService
{
    class CalculatorService : ICalculatorService
    {
        //--------------------------------------------------------
        public double[,] Add(double[,] A, double[,] B)
        {
            int size = A.Length;
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] + B[i, j];

            return C;
        }

        public double[,] Subtract(double[,] A, double[,] B)
        {
            int size = A.Length;
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] - B[i, j];

            return C;
        }

        public double[,] Mult(double[,] A, double[,] B)
        {
            int size = A.Length;
            double[,] C = new double[size, size];

            for (int i = 0; i < size; i++)
                for (int j = 0; j < size; j++)
                    for (int z = 0; z < size; z++)
                        C[i, j] += A[i, z] * B[z, j];

            return C;
        }

        public double[,] Divide(double[,] A, double[,] B)
        {
            int size = A.Length;
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] + B[i, j];

            return C;
        }


        //--------------------------------------------------------
        public double[,] Reverse(double[,] A)
        {
            throw new NotImplementedException();
        }

        public double[,] Transposing(double[,] A)
        {
            throw new NotImplementedException();
        }

        public double[,] MultOn(double[,] A, double number)
        {
            int size = A.Length;
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] * number;

            return C;
        }

        public double[,] DivideOn(double[,] A, double number)
        {
            int size = A.Length;
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = A[i, j] * 1/number;

            return C;
        }


        //--------------------------------------------------------
        public double[,] GetZeroMatrix(int size)
        {
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                for (int j = 0; j <= size; j++)
                    C[i, j] = 0;

            return C;
        }

        public double[,] GetIdentityMatrix(int size)
        {
            double[,] C = new double[size, size];

            for (int i = 0; i <= size; i++)
                C[i, i] = 1;

            return C;
        }
    }
}
