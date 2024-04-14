/*In the town of ArrayVille, ordinary citizens faced a peculiar puzzle in their daily lives. The friendly neighbourhood programmer, armed with algorithms, helped them navigate a array maze. Together, they erased segments whose sums equaled zero. The townsfolk, relieved of the burdensome nodes, rejoiced as their ArrayVille list transformed. Grateful, they bid farewell to the programmer, carrying the final head of the list—a testament to the power of community and algorithms in the heart of ArrayVille.*/

#include <bits/stdc++.h>
using namespace std;

vector<int> removeZeroSumSublists(const vector<int> &nums)
{
   unordered_map<int, int> prefixSumMap;
   vector<int> result;
   int prefixSum = 0;
   prefixSumMap[0] = -1;
   for (int i = 0; i < nums.size(); ++i)
   {
      prefixSum += nums[i];
      if (prefixSumMap.find(prefixSum) != prefixSumMap.end())
      {
         result.clear();
         i = prefixSumMap[prefixSum] + 1;
         prefixSumMap.clear();
         prefixSumMap[0] = i - 1;
         prefixSum = 0;
      }
      else
      {
         prefixSumMap[prefixSum] = i;
         result.push_back(nums[i]);
      }
   }

   return result;
}

int main()
{
   int n1, x1;
   cin >> n1;
   vector<int> input;
   for (int i = 0; i < n1; i++)
   {
      cin >> x1;
      input.push_back(x1);
   }
   vector<int> output = removeZeroSumSublists(input);

   cout << "Input: ";
   for (int num : input)
   {
      cout << num << " ";
   }
   cout << endl;

   cout << "Output: ";
   for (int num : output)
   {
      cout << num << " ";
   }
   cout << endl;

   return 0;
}
