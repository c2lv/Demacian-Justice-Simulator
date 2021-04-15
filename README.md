# Demacian-Justice-Simulator
## Play
[시뮬레이터 플레이](https://c2lv.github.io/Demacian-Justice-Simulator/)
## Introduce
MOBA(Multiplayer Online Battle Arena) 장르 게임 '리그 오브 레전드(League Of Legend)'의 챔피언 가렌 궁극기 대미지 시뮬레이터입니다.  
가렌의 궁극기 명칭은 데마시아의 정의(Demacian Justice)이고 고정 피해이며 궁극기의 레벨별 대미지 계산 공식은 다음과 같습니다.  

> 150 / 300 / 450 (+ 대상이 잃은 체력의 20% / 25% / 30%), 소수점 셋째 자리에서 반올림  

가렌 장인(글 작성 시점 실버 2)인 개발자가 게임에서 좀 더 궁극기 킬각을 잘 잴 수 있는 방법이 없을까 오래 전부터 구상하다가 만들었습니다.  

**Custum Mode**와 **Test Mode**를 지원합니다.  
- **Custum Mode**: 적 챔피언(티모)의 현재 체력, 최대 체력, 궁극기 레벨을 자유롭게 조정하여 해당 상황에서 처치 가능 여부를 확인해볼 수 있습니다.  
- **Test Mode**: 랜덤으로 주어지는 상황에서 킬각(처치 가능)인지 맞혀보는 문제 풀이 모드입니다.  
연속으로 맞힌 횟수에 따라 난이도 상승을 위해 오차범위(0 ~ 9: ±1000, 10 ~ 19: ±100, 20 ~ 29: ±10, 30 ~: ±1)가 조정됩니다. 생각보다 어렵습니다.  
## Problem
- CSS 상하 가운데 정렬이 필요합니다.
- 전반적인 디자인 개선이 필요합니다.
- HTML progress 체력 게이지 바를 롤과 유사한 모양으로 구현하면 실전에서 더욱 도움이 될 것으로 예상됩니다.(바코드 모양, 현재 체력 100 단위 실선/1000 단위 굵은 선으로 구분)
## Source
[League Of Legend Wiki](https://leagueoflegends.fandom.com/wiki/League_of_Legends_Wiki)  
[League Of Legend API](https://developer.riotgames.com/docs/lol)  
[Sound](https://goodcow.tistory.com/58)  
