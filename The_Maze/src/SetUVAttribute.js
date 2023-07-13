export function Set_uvAttribute(objeto)
{
        objeto.setXY(0,        0.33,        0.5);   // Superior Esquerdo    ------------>    ________
        objeto.setXY(1,        0.66,        0.5);   // Superior Direito     ------------>   |        |
        objeto.setXY(2,        0.33,        0);     // Inferior Esquerdo    ------------>   |  DIR.  |
        objeto.setXY(3,        0.66,        0);     // Inferior Direito     ------------>   |________|

        objeto.setXY(4,        0,           0.5);   // Superior Esquerdo    ------------>    ________
        objeto.setXY(5,        0.33,        0.5);   // Superior Direito     ------------>   |        |
        objeto.setXY(6,        0,           0);     // Inferior Esquerdo    ------------>   | ESQUER |
        objeto.setXY(7,        0.33,        0);     // Inferior Direito     ------------>   |________|

        objeto.setXY(16,       0,           1);     // Superior Esquerdo    ------------>    ________
        objeto.setXY(17,       0.33,        1);     // Superior Direito     ------------>   |        |
        objeto.setXY(18,       0,           0.5);   // Inferior Esquerdo    ------------>   | FRENTE |
        objeto.setXY(19,       0.33,        0.5);   // Inferior Direito     ------------>   |________|

        objeto.setXY(20,       0.33,        1);     // Superior Esquerdo    ------------>    ________
        objeto.setXY(21,       0.66,        1);     // Superior Direito     ------------>   |        |
        objeto.setXY(22,       0.33,        0.5);   // Inferior Esquerdo    ------------>   |  TRAS  |
        objeto.setXY(23,       0.66,        0.5);   // Inferior Direito     ------------>   |________|

        objeto.setXY(8,        0.66,        1);     // Superior Esquerdo    ------------>    ________
        objeto.setXY(9,        1,           1);     // Superior Direito     ------------>   |        |
        objeto.setXY(10,       0.66,        0.5);   // Inferior Esquerdo    ------------>   |  CIMA  |
        objeto.setXY(11,       1,           0.5);   // Inferior Direito     ------------>   |________|

        objeto.setXY(12,       0.66,        0.5);   // Superior Esquerdo    ------------>    ________
        objeto.setXY(13,       1,           0.5);   // Superior Direito     ------------>   |        |
        objeto.setXY(14,       0.66,        0);     // Inferior Esquerdo    ------------>   | BAIXO  |
        objeto.setXY(15,       1,           0);     // Inferior Direito     ------------>   |________|
}