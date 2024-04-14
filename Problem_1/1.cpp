/*In the realm of Puzzlaria, two mysterious arrays, Array X and Array Y, held the secret to a hidden treasure. The enigmatic guardians of Puzzlaria set forth a challenge for the aspiring wizards. Their quest began with Array X, where the wizards needed to discern the most significant element – the one with the highest "magic count." Armed with their wits and keen observation, the wizards had to identify this mystical element.
Having discovered the magical element in Array X, the wizards faced the second part of the challenge. Array Y, a mystical counterpart, awaited exploration. Here, the wizards needed to ascertain whether the magical element from Array X existed within the enchanting Array Y. The guardians emphasized creativity and problem-solving, urging the wizards to devise a clever strategy without delving into complex algorithms.*/

#include <bits/stdc++.h>
using namespace std;

bool hasTreasure(const vector<int> &X, const vector<int> &Y)
{
   unordered_map<int, int> countX;
   int maxMagic = 0;
   for (int num : X)
   {
      maxMagic = max(maxMagic, ++countX[num]);
   }
   for (int num : Y)
   {
      if (countX[num] == maxMagic)
      {
         return true;
      }
   }
   return false;
}

int main()
{
   int n1, n2;
   cin >> n1 >> n2;
   int x1, x2;
   vector<int> X1;
   vector<int> Y1;
   for (int i = 0; i < n1; i++)
   {
      cin >> x1;
      X1.push_back(x1);
   }
   for (int i = 0; i < n2; i++)
   {
      cin >> x2;
      Y1.push_back(x2);
   }
   cout << (hasTreasure(X1, Y1) ? "true" : "false") << endl;

   return 0;
}