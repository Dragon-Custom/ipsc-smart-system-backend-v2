# Entities
## User
Every user own its own shooter profile. The user is use to login to the website, and the shooter is use to record their socre, statistics, and score.

Once user were registered, they can create their own shooter profile, or adopt to a shooter profile that did owned by someone else.[more explanation](#types-of-shooter)

User contians the following information:
- Nickname
- Email
- Password
- [Shooter profile](#shooter)
- etc..

## Shooter
The shooter is for assigned to it's belonging user. The shooter is use to  track their progress, record their score, and statistics.

### Types of shooter
1. Personal shooter: A shooter that is created by a user.
	- This type of shooter usually created by a user themselves.
2. Team shooter: A shooter that is created by a team.
	- This type of shooter usually created by the admin of the team. When the team member didn't register in the website, the admin of the team can create a shooter profile for them.

Shooter contains the following information:
- [User?](#user)
- Name
- Email
- Team
- etc..

## Match shooter
Match shooter is inherent from the shooter entity. It's not expose to the user, but it's used to differentiate between the shooter and shooter in the match.

Match shooter contains the following information:
- [Shooter](#shooter)
- Squad
- Class
- Division
- DQed (this is for the match-wide DQ)
- etc..

## Teams
Teams can be created by users, and the user that created the team is the owner of the team. Owner have the permission grant admin roles to other team members.

Team contains the following information:
- [Shooters](#shooter)
- [Admins](#shooter)
- Name
- Owner
- etc..

## Stages
Stages can be created by users, and they can assign the stages to the stage's designer.

Stage contains the following information:
- [Deisgners](#user)
- Total Paper Targets
- Total Popper Targets
- Total No-shoot Targets
- Is B zone enabled
- Stage type (according to the rule books, short, medium or long)
- Stage category (just like the hash-tags in social media)
- The photos of the stage
- Walkthrough time
- Description (also where you put the brief)
- Gun condition
- Time stop: last shot / stopplate
- Time start: audio / visual
- etc..

## Match
Match can be created by user, the user that created the match is match organizer.

Match contains the following information:
- [Match organizer](#user)
- [Stages](#stage)
- [RO](#user)
	- RO owns the permission to assign score.
- [CRO](#user)
	- CRO owns all the permission to manage the match.
- [SO](#user)
	- Same as RO.
- [QM](#user)
	- QM only owns the permission to record the match result.
- [RM](#user)
	- RM owns all the permission to manage the match.
- [MD](#user)
	- Same as RO.
- Level (according to the rule books, level 1 - 5)
- [Included squads](#match-shooter)