const docs = [
    {
        title: 'ArmA3',
        subtitle: 'Documentation',
        icon: 'https://www.justkaarlo.com/res/icons/arma3.ico',
        link: 'https://www.justkaarlo.com/docs/arma3',
        contentType: 'link'
    },
    {
        title: 'Gray Zone Warfare',
        subtitle: 'Documentation',
        icon: 'https://www.justkaarlo.com/res/icons/grayzone.ico',
        link: 'https://www.justkaarlo.com/docs/grayzone',
        contentType: 'link'
    },
];

const mods = [
    {
        title: 'Elden Ring',
        subtitle: 'Shared Mods',
        icon: 'https://www.justkaarlo.com/res/icons/eldenring.ico',
        link: 'https://www.justkaarlo.com/mods/elden-ring',
        contentType: 'link'
    },
];

const arma3Guides = [
    { // Infinite Fuel & Ammo
        title: 'Infinite Fuel & Ammo',
        subtitle: 'Snippets',
        icon: 'https://www.justkaarlo.com/res/core/icons/star.png',
        contentType: 'description',
        showTOC: true,
        description: `
            <h2>Ammo</h2>
            <div class="tabs" data-tabs>
                <div class="tab-list">
                    <button class="tab-btn active" data-tab="tab-InfAmo">Infinite Ammo</button>
                    <button class="tab-btn" data-tab="tab-InfAmoRes">Infinite Ammo On Respawn</button>
                </div>

                <div class="tab-pane active" id="tab-InfAmo">
                    <span data-toc="Infinite Ammo"></span>
                    <span class="text-gray" id="small">Choose a vehicle and place it down. Then double-click on it and insert this code into the init field</span>
                    <pre class="sqf-block">this addEventHandler ["Fired",{(_this select 0) setVehicleAmmo 1}]</pre>
                </div>
                <div class="tab-pane" id="tab-InfAmoRes">
                    <span data-toc="Infinite Ammo On Respawn"></span>
                    <span class="text-gray" id="small">Put this in the init field of the vehicle</span>
                    <pre class="sqf-block">this addEventHandler ["Fired",{(_this select 0) setVehicleAmmo 1}]</pre>
                    <span class="text-gray" id="small">And put this in the Expression field of the Vehicle Respawn module:</span>
                    <pre class="sqf-block">params ["_newVehicle","_oldVehicle"]; _newVehicle addEventHandler ["fired", {(_this select 0) setVehicleAmmo 1}];</pre>
                </div>
            </div>
            <hr>
            <h2>Fuel</h2>
            <div class="tabs" data-tabs>
                <div class="tab-list">
                    <button class="tab-btn active" data-tab="tab-InfFul">Infinite Fuel</button>
                    <button class="tab-btn" data-tab="tab-InfFulRes">Infinite Fuel On Respawn</button>
                </div>
                <div class="tab-pane active" id="tab-InfFul">
                    <span data-toc="Infinite Fuel"></span>
                    <span class="text-gray" id="small">Choose a vehicle and place it down. Then double-click on it and insert this code into the init field:</span>
                    <div class="box"> <code>Example 1</code>
                        <pre class="sqf-block">this spawn {while {alive _this} do {uisleep 300; _this setFuel 1}};</pre>
                    </div>
                    <div class="box"> <code>Example 2</code>
                        <pre class="sqf-block">this addEventHandler ["Fuel", {(_this select 0) setFuel 1}];</pre>
                    </div>
                </div>
                <div class="tab-pane" id="tab-InfFulRes"></pre>
                    <span data-toc="Infinite Fuel On Respawn"></span>
                    <div class="box"> <code>Example 1</code>
                        <span class="text-gray" id="small">Put this in the init field of the vehicle</span>
                        <pre class="sqf-block">this spawn {while {alive _this} do {uisleep 300; _this setFuel 1}};</pre>
                        <span class="text-gray" id="small">And put this in the Expression field of the Vehicle Respawn module</span>
                        <pre class="sqf-block">params ["_newVehicle","_oldVehicle"]; _newVehicle spawn {while {alive _this} do {uisleep 300; _this setFuel 1}};</pre>
                    </div>
                    <div class="box"> <code>Example 2</code>
                        <span class="text-gray" id="small">Put this in the init field of the vehicle</span>
                        <pre class="sqf-block">this addEventHandler ["Fuel", {(_this select 0) setFuel 1}];</pre>
                        <span class="text-gray" id="small">And put this in the Expression field of the Vehicle Respawn module</span>
                        <pre class="sqf-block">_newVehicle addEventHandler ["Fuel", {(_this select 0) setFuel 1}];</pre>
                    </div>
                    </div>
                </div>
            </div>
        `,
    },
    { // Disable Stamina For All AI
        title: 'Disable Stamina For All AI',
        subtitle: 'Snippets',
        icon: 'https://www.justkaarlo.com/res/core/icons/star.png',
        contentType: 'description',
        showTOC: true,
        description: `
            <span class="text-gray" id="small">Go to your mission folder go to your <strong>init.sqf</strong> file and add this line in there or just run it in the debug console.</span>
            <pre class="sqf-block">[] spawn { while {true} do { { _x enableStamina false } foreach allunits; sleep 20; }; };</pre>
        `,
    },
    { // ACE
        type: 'section',
        title: 'ACE',
        subtitle: '━━━━━━━'
    },
    { // Adjusting Cargo Space For Vehicle
        title: 'Adjusting Cargo Space',
        subtitle: 'Snippets',
        icon: 'https://www.justkaarlo.com/res/core/icons/star.png',
        contentType: 'description',
        showTOC: true,
        description: `
            <span class="text-gray" id="small">This snippets are used when you are playing as Zeus. First start with placing down a vehicle or aircraft.<br>Double click on the vehicle you just placed down. Then put this code in Execute field,<br>and note that you need to have it on Local Exec</span>
            <pre class="sqf-block">[_this, 100] call ace_cargo_fnc_setSpace</pre>
        `,
    },
    { // ACE ARSENAL
        title: 'ACE Arsenal',
        subtitle: 'Snippets',
        icon: 'https://www.justkaarlo.com/res/core/icons/star.png',
        contentType: 'description',
        showTOC: false,
        description: `
            <div class="tabs" data-tabs>
                <div class="tab-list">
                    <button class="tab-btn active" data-tab="tab-AceArsExp1">Example 1</button>
                    <button class="tab-btn" data-tab="tab-AceArsExp2">Example 2</button>
                    <button class="tab-btn" data-tab="tab-AceArsExp3">Example 3</button>
                </div>
                <div class="tab-pane active" id="tab-AceArsExp1">
                    <span class="text-gray" id="small">Begin by placing an object, such as a <code>B_CargoNet_01_ammo_F</code>, but feel free to use any object you prefer. Now double-click on the object and enter the following code into the init field:</span>
                    <pre class="sqf-block">[this, true] call ace_arsenal_fnc_initBox;</pre>
                </div>
                <div class="tab-pane" id="tab-AceArsExp2">
                    <span class="text-gray" id="small">This one is unique with its special design. Begin by placing an object. Double-click on it to access the init field. Insert the following code</span>
                    <pre class="sqf-block">this addAction [&quot;&lt;t color='#FFFFFF' size='1'&gt;&lt;img image='a3/ui_f/data/logos/a_64_ca.paa'/&gt;&lt;t color='#ffd700' size='1' font='puristaBold'&gt;ACE ARSENAL&lt;/t&gt;&quot;, {[player, player, true] call ace_arsenal_fnc_openBox;}];</pre>
                </div>
                <div class="tab-pane" id="tab-AceArsExp3">
                    <span class="text-gray" id="small">Start by placing down a trigger and put this activation settings</span>
                    <div class="box"> 
                        <strong>Activation</strong>
                        <table>
                            <tr>
                                <td><code>Type</code></td>
                                <td>None</td>
                            </tr>
                            <tr>
                                <td><code>Activation</code></td>
                                <td>Any Player</td>
                            </tr>
                            <tr>
                                <td><code>Activation Type</code></td>
                                <td>Present</td>
                            </tr>
                            <tr>
                                <td><code>Repeatable</code></td>
                                <td><span class="badge">YES</span></td>
                            </tr>
                            <tr>
                                <td><code>Server Only</code></td>
                                <td><span class="badge">NO</span></td>
                            </tr>
                        </table>
                    </div>
                    <span class="text-gray" id="small">Now that you have filled in those settings, navigate to Expression and utilize the following</span>
                    <div class="box"> 
                        <strong>Expression</strong>
                        <table>
                            <tr>
                                <td>
                                    <code>Condition</code>
                                    <pre class="sqf-block">player in thisList</pre>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>On Activation</code>
                                    <pre class="sqf-block">thisTrigger setVariable [&quot;_playerAction&quot;, player addAction [&quot;&lt;t color='#FFFFFF' size='1.4'&gt;&lt;img image='a3/ui_f/data/logos/a_64_ca.paa'/&gt;&lt;t color='#ffd700' size='1.4' font='PuristaBold'&gt; ACE Arsenal&lt;/t&gt;&lt;/t&gt;&quot;, {[player, player, true] call ace_arsenal_fnc_openBox;}]];</pre>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>On Deactivation</code>
                                    <pre class="sqf-block">player removeAction (thisTrigger getVariable ["_playerAction", -1])</pre>
                                </td>
                            </tr>
                        </table>
                        <span class="text-gray" id="small">Now you've set up a trigger area. When a player enters this area, they will be presented with an action called ACE Arsenal.</span>
                    </div>
                </div>
            </div>
        `,
    },
    { // ANTISTASI
        type: 'section',
        title: 'ANTISTASI',
        subtitle: '━━━━━━━'
    },
    { // Antistasi Wiki
        title: 'Wiki Documentation',
        subtitle: 'Default & Ultimate',
        icon: 'https://www.justkaarlo.com/res/core/icons/wiki.png',
        link: 'https://official-antistasi-community.github.io/A3-Antistasi-Docs/',
        contentType: 'link',
    },
    { // Antistasi Ultimate Website
        title: 'Official Website',
        subtitle: 'Ultimate',
        icon: 'https://www.justkaarlo.com/res/core/icons/link.png',
        link: 'https://antistasiultimate.com/',
        contentType: 'link',
    },
    { // Antistasi Ultimate Commands
        title: 'Console Commands',
        subtitle: 'Default & Ultimate',
        icon: 'https://www.justkaarlo.com/res/core/icons/star.png',
        link: 'https://official-antistasi-community.github.io/A3-Antistasi-Docs/dev_guide/dev/dev_guide_console_commands.html#',
        contentType: 'description',
        showTOC: true,
        description: `
            <img src="https://antistasiultimate.com/images/SiteLogo1.png" alt="Description">
            <h2>Debug Console Commands for Admin</h2>
            <div class="box box-danger">
                Following is an unsorted collection of debug console commands that usually are not or should not be used by admins and players on live servers.
            </div>
            <span data-toc="Preferance(s)"></span>
            <button class="btn-action" onclick="window.open('https://github.com/Antistasi-Ultimate-Community/A3-Antistasi-Ultimate/wiki/Developer-Documentation', '_blank');">Antistasi Ultimate Github</button>
            <button class="btn-action" onclick="window.open('https://official-antistasi-community.github.io/A3-Antistasi-Docs/dev_guide/dev_guide_index.html', '_blank');">Official Antistasi Dev Guide</button>
            <hr>

            <span data-toc="Nearest Marker"></span><div class="box">
                <code>Nearest Marker</code>  <span class="text-gray" id="small">Run as local. Prints nearest marker in a hint on screen.</span>
                <pre class="sqf-block">["Nearest Marker", format ["%1",([markersX, player] call BIS_fnc_nearestPosition)]] call A3A_fnc_customHint;</pre>
            </div>

            <span data-toc="Display Markernames(s)"></span><div class="box">
                <code>Display Markernames</code>  <span class="text-gray" id="small">Run as Local. Changes all markernames to their variable names.</span>
<pre class="sqf-block">
{
    _mrk = format ["Dum%1", _x];
    _mrk setMarkerTextLocal _x;
} forEach (outposts + seaports + airportsX + resourcesX + factories);
</pre>
</div>
            <span data-toc="Start An Attack"></span><div class="box">
                <code>Start An Attack</code> <span class="text-gray" id="small">Run as server. Will start the process of selecting a target for an attack and attacking it for the given side (side can be Invaders or Occupants). This might result in the other side counterattack and take something or four smaller attacks instead of one big attack mission.</span>
<pre class="sqf-block"><pre class="sqf-block">[side] spawn A3A_fnc_rebelAttack;</pre>
</div>
            <span data-toc="Resources & Money"></span><div class="box">
                <code>Resources & Money</code> <span class="text-gray" id="small">Both run as local. First adds a certain amount to your personal money, Second adds HR and Money to the faction. Replace PM, HR, Money with the value you want to add. Negative numbers will subtract.</span>
<pre class="sqf-block">[PM] call A3A_fnc_resourcesPlayer;</pre>

<pre class="sqf-block"><pre class="sqf-block">
// [HR,Money]
[0,0] remoteExec ["A3A_fnc_resourcesFIA",2];</pre>
</div>
        `,
    },
]

const gzwGuides = [
    {
        type: 'section',
        title: 'Resources',
        subtitle: `━━━━━━━`
    },
    {
        title: 'Top Ammunitions',
        subtitle: 'Ranking',
        icon: 'https://www.justkaarlo.com/res/core/icons/bullet.png',
        contentType: 'description',
        showTOC: true,
        description: `
            <img src="https://www.justkaarlo.com/res/assets/banners/ballistics.png" alt="Banner">
            <span data-toc="Top" data-toc-level="h1"></span>
            <a href="https://www.grayzonewarfare.net/ballistics" class="btn-action-gzw">Ballistics</a> <a href="https://gzwloadout.com/" class="btn-action-gzw">Weapon Builder</a>
            <div class="box">
                <b>List the top ammunition to use for each caliber.</b>
            </div>
            <hr>
            <div class="cards cards-2">
                <div class="card">
                    <div class="card-title"><h4 style="margin-top: -2px; margin-bottom: -14px;">5.56x45mm</h4></div>
                    <div class="card-body">
                        <div class="box">
                            <span class="font-size-14 text-gzw-2 text-gzw-weight-500 text-gzw-font-1 frame-gzw-1"><img class="image-28x28" src="https://www.justkaarlo.com/res/assets/ammo/556x45-m855a1.png">AP M855A1</span>
                            <span class="spacer t10"></span>
                            <span class="badge">Gunny</span> <span class="badge badge-gzw">LV3</span>
                            <br><span class="spacer t20"></span><hr>
                            <span class="font-size-14 text-gzw-2 text-gzw-weight-500 text-gzw-font-1 frame-gzw-1"><img class="image-28x28" src="https://www.justkaarlo.com/res/assets/ammo/556x45-m995.png">AP M995</span>
                            <span class="spacer t10"></span>
                            <span class="badge">Gunny</span> <span class="badge badge-gzw">LV4</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title"><h4 style="margin-top: -2px; margin-bottom: -14px;">5.45x39mm</h4></div>
                    <div class="card-body">
                        <div class="box">
                            <span class="font-size-14 text-gzw-2 text-gzw-weight-500 text-gzw-font-1 frame-gzw-1"><img class="image-28x28" src="https://www.justkaarlo.com/res/assets/ammo/545x39-bs7n24.png">BS 7N24</span>
                            <span class="spacer t10"></span>
                            <span class="badge">Turncoat</span> <span class="badge badge-gzw">LV4</span>
                            <br><span class="spacer t20"></span><hr>
                            <span class="font-size-14 text-gzw-2 text-gzw-weight-500 text-gzw-font-1 frame-gzw-1"><img class="image-28x28" src="https://www.justkaarlo.com/res/assets/ammo/545x39-bp7n22.png">BP 7N22</span>
                            <span class="spacer t10"></span>
                            <span class="badge">Turncoat</span> <span class="badge badge-gzw">LV4</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title"><h4 style="margin-top: -2px; margin-bottom: -14px;">7.62x25mm</h4></div>
                    <div class="card-body">
                        <div class="box">
                            <span class="font-size-14 text-gzw-2 text-gzw-weight-500 text-gzw-font-1 frame-gzw-1"><img class="image-28x28" src="url">None</span>
                            <span class="spacer t10"></span>
                            <span class="badge">N/A</span> <span class="badge badge-gzw">N/A</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
    },
    {
        title: 'Tasks',
        subtitle: 'Handy-Notes',
        icon: 'https://www.justkaarlo.com/res/core/icons/items.png',
        link: 'https://gray-zone-warfare.fandom.com/wiki/Tasks',
        contentType: 'description',
        showTOC: true,
        description: `
            <img src="https://www.justkaarlo.com/res/assets/banners/tasks.png" alt="Banner">
            <span data-toc="Top" data-toc-level="h1"></span>
            <div class="box">
                <b>Quick information about tasks...</b>
            </div>
            <hr>
            <h2>Task Types</h2>
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    <span data-toc="Main Tasks" data-toc-level="h3"></span>
                    <b><span class="text-gzw-1">Main Tasks</span></b><br>
                      Primary means of advancing the plot and uncovering the secrets surrounding Lamang.
                    <br>
                    <span data-toc="Side Tasks" data-toc-level="h3"></span>
                    <b><span class="text-gzw-1">Side Tasks</span></b><br>
                      Side tasks serve to develop relationships with vendor and provide additional information that is not crucial to advancing the plot.<br>
                      Some side tasks are hidden. To trigger these tasks, the player must find them in the world.
                    <br>
                    <span data-toc="Contracts" data-toc-level="h3"></span>
                    <b><span class="text-gzw-1">Contracts</span></b><br>
                      Contracts are short tasks vendors assign when they need something done quickly.
                    <br>
                    <span data-toc="Long-Term Contracts" data-toc-level="h3"></span>
                    <b><span class="text-gzw-1">Long-Term Contracts</span></b><br>
                      extensive assignments that may require the player to search for specific items, investigate remote locations, or<br>
                      eliminate targets across regions.
                    <br><span class="spacer t10"></span>
                      Unlike other task types, long-term contracts are not displayed directly on the tactical map; instead,<br>
                      they appear in a separate panel on its edge.
                    <br><span class="spacer t10"></span>
                      New long-term contracts are made available as the player unlocks new regions of the world.
                </div>
            </div>
            <hr>
            <h2>Repeatable Tasks</h2>
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    <ul>
                        <li>
                            Every tasks outside of the starter region can be repeated as much as the player wants.
                        </li>
                        <li>
                            Everytime a task is completed, it gives a new task from a pool of possible task to the player.
                        </li>
                        <li>
                            If the player fail a task, the tasks will be sent back into the pool of possible task after at least 20 minutes.
                        </li>
                        <li>
                            Rewards after the first completion are lower than the first completion rewards.
                        </li>
                    </ul>
                </div>
            </div>
            <hr>
            <h2>Task Items</h2>
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    Some items only spawn if the respective task is active. These items fall in the <a class="gzw" href="https://gray-zone-warfare.fandom.com/wiki/Category:Task_Item">task items category</a> and cannot be used, sold or discarded.
                    <ul>
                        <li>
                            Tasks items are guaranteed to spawn, so each player in the same server with the same quest active can pick it up.
                        </li>
                        <li>
                            When picked up, quest items are transferred to the player inventory (backpack/belt/vest). The player need<br>
                            to survive up to a <a class="gzw" href="https://gray-zone-warfare.fandom.com/wiki/Locations#Combat_Outpost">Combat Outpost</a> or the main base to handover the item to the designated vendor.
                        </li>
                    </ul>
                </div>
            </div>
        `,
    },
    {
        title: 'Medical System',
        subtitle: 'Useful',
        icon: 'https://www.justkaarlo.com/res/core/icons/medical.png',
        link: 'https://gray-zone-warfare.fandom.com/wiki/Health_system',
        contentType: 'description',
        showTOC: true,
        description: `
            <span data-toc="Top" data-toc-level="h2"></span>
            <img src="https://www.justkaarlo.com/res/assets/banners/medical.png" alt="Banner">
            <div class="box">
                <b>Useful information and notes about the medical system, including medical item effects, treatments, and what supplies you should always carry.</b>
            </div>
            <hr>
            <h2>Treatment Options</h2>
            You can find a list of all available medical items and what they do <a class="gzw" href="https://gray-zone-warfare.fandom.com/wiki/Medical">here</a>. This page lists every medical item<br>
            in the game, and their weakness/buffs.
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    <b><span class="text-gzw-1">Bandages</span></b>  Treats wounds but not bruises.<br>
                    <b><span class="text-gzw-1">Tourniquets</span></b>  Stops bleeding but won't treat wounds.<br>
                    <b><span class="text-gzw-1">Splints</span></b>  Repair damaged bones.<br>
                    <b><span class="text-gzw-1">Surgery Kits</span></b>  Restore damaged or destroyed organs.<br>
                    <b><span class="text-gzw-1">Blood Bags</span></b>  Replenish lost blood.<br>
                    <b><span class="text-gzw-1">Pain Killers</span></b>  Pills that can treat pain; details provided in item descriptions.<br>
                    <b><span class="text-gzw-1">Intoxication Pills</span></b>  Pills that can cure radiation and intoxication; details provided in item descriptions.<br>
                    <b><span class="text-gzw-1">Stimulants</span></b>  Alter Health System behavior with benefits and drawbacks; details provided in item descriptions.<br>
                </div>
            </div>
            <hr>
            <h2>What To Bring Every Deployment</h2>
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    <h5>Always Carry</h5>
                    <div class="cards cards-4">
                        <div class="card">
                            <div class="card-title">
                                <img class="image-24x24" src="https://pub-0f96b00a20824fbbb1756d5bf2bd2ae3.r2.dev/items/med_tour_cat.png">Tourniquet
                            </div>
                            <div class="card-body">
                                 Instantly stops heavy or medium bleeding so you don't bleeding out.
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title">
                                <img class="image-24x24" src="https://pub-0f96b00a20824fbbb1756d5bf2bd2ae3.r2.dev/items/med_band_emergency_trauma_dressing.png">Bandages
                            </div>
                            <div class="card-body">
                                Seals light wounds (Bandages stop bleeds but do not heal bruises).
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title">
                                <img class="image-24x24" src="https://pub-0f96b00a20824fbbb1756d5bf2bd2ae3.r2.dev/items/med_surg_emergency_suture_kit.png">Surgery Kit
                            </div>
                            <div class="card-body">
                                Fixing damaged or destroyed organs (which can cause sickness and nausea).
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title">
                                <img class="image-24x24" src="https://pub-0f96b00a20824fbbb1756d5bf2bd2ae3.r2.dev/items/med_splint_flexible_splint.png">Splint
                            </div>
                            <div class="card-body">
                                Repairs fractured or broken bones.
                            </div>
                        </div>
                    </div>
                    <br>
                    <h5>Highly Recommended</h5>
                    <div class="cards cards-2">
                        <div class="card">
                            <div class="card-title">
                                <img class="image-24x24" src="https://pub-0f96b00a20824fbbb1756d5bf2bd2ae3.r2.dev/items/med_pills_ibalin_bottle.png">Painkillers
                            </div>
                           <div class="card-body">
                                Treats concussion symptoms and pain.
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-title">
                                <img class="image-24x24" src="https://pub-0f96b00a20824fbbb1756d5bf2bd2ae3.r2.dev/items/med_iv_blood_bag_small.png">Blood Bag
                            </div>
                           <div class="card-body">
                                Restores lost blood to stop dizziness & prevent comas.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `,
    },
    {
        title: 'Mines & Tripwires',
        subtitle: 'Handy-Notes',
        icon: 'https://www.justkaarlo.com/res/core/icons/tripmine.png',
        contentType: 'description',
        showTOC: true,
        description: `
            <span data-toc="Top" data-toc-level="h2"></span>
            <img src="https://www.justkaarlo.com/res/assets/banners/mines.png" alt="Banner">
            <div class="box">
                Mines and tripwires are environmental hazards that cause instant death or trigger traps.<br>
                They are placed around Main Operating Bases, major Combat Outposts, specific mission areas<br>
                (like the Troll Bridge west of Tiger Bay), and are randomly hidden on paths near campsites.
            </div>
            <hr>
            <h2>Locations</h2>
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    <b><span class="text-gzw-1">Main Bases & COPs</span></b><br>
                      Automatically triggered if an enemy player attempts to breach or bypass the main base entrances.
                    <br>
                    <b><span class="text-gzw-1">Mission Areas</span></b><br>
                      Known missions like "Troll Bridge" feature explicitly trapped/mined bridges leading to objective areas.
                    <br>
                    <b><span class="text-gzw-1">Randomized Tripwires</span></b><br>
                      Scattered around LLA areas, campsites, and hidden docks (e.g., near Ban Pa)
                </div>
            </div>
            <hr>
            <h2>How to Survive & Defuse</h2>
            <div class="callout callout-gzw-1">
                <div class="callout-body">
                    <b><span class="text-gzw-1">Tripwires</span></b><br>
                      You can hear a distinct "click" when walking through them. If you hear it,<br>
                      sprint away immediately.
                    <br>
                    <b><span class="text-gzw-1">Defusing</span></b><br>
                      If equipped with a Multitool, you can crouch down, look directly at the wire<br>
                      or a stick, and hold the interact key to safely disarm it.
                    <br>
                    <b><span class="text-gzw-1">Map Awareness</span></b><br>
                      Because traps are incredibly difficult to spot in the brush, it is highly recommended to<br>
                      use the <a class="gzw" href="https://mapgenie.io/gray-zone-warfare">Gray Zone Warfare Map on MapGenie</a> to check boundaries and avoid known danger zones.
                </div>
            </div>
        `,
    },
    {
        type: 'section',
        title: 'Third-Party Links',
        subtitle: `━━━━━━━`
    },
    {
        title: 'Vendors',
        subtitle: 'GZWLoadout.com',
        icon: 'https://www.justkaarlo.com/res/core/icons/cart.png',
        contentType: 'link',
        link: 'https://gzwloadout.com/vendors',
        badge: {
            icon: 'https://www.justkaarlo.com/res/ui/32x32/grayzone-web.png',
            position: 'right'
        }
    },
    {
        title: 'Items',
        subtitle: 'GZWItems.com',
        icon: 'https://www.justkaarlo.com/res/core/icons/items.png',
        contentType: 'link',
        link: 'https://gzwitems.com/',
        badge: {
            icon: 'https://www.justkaarlo.com/res/ui/32x32/grayzone-web.png',
            position: 'right'
        }
    },
    {
        title: 'Interactive Map',
        subtitle: 'GZWTacMap.com',
        icon: 'https://www.justkaarlo.com/res/core/icons/location.png',
        contentType: 'link',
        link: 'https://gzwtacmap.com/maps/lamang',
        badge: {
            icon: 'https://www.justkaarlo.com/res/ui/32x32/grayzone-web.png',
            position: 'right'
        }
    },
    {
        title: 'Blueprints',
        subtitle: 'WhereIsVulture.com',
        icon: 'https://www.justkaarlo.com/res/core/icons/blueprint.png',
        contentType: 'link',
        link: 'https://whereisvulture.com/blueprints',
        badge: {
            icon: 'https://www.justkaarlo.com/res/ui/32x32/grayzone-web.png',
            position: 'right'
        }
    },
]

const GuideConfigs = {
    main: guides,
    arma3: arma3Guides,
    grayzone: gzwGuides,
    mods: mods,
    docs: docs,

    getGuides(pageName) {
        return this[pageName] || [];
    }
};