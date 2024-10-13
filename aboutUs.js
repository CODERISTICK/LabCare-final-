function showDetails(memberName) {
    const details = {
        "Rhoderick G. Azuelo Jr": {
            role: "Leader / Programmer / Designer / Thinker",
            info: "Rhoderick is a creative leader from Notre Dame of Marbel University, currently in his 2nd year of BSIT. He excels in programming and design, guiding his team with innovative ideas and technical expertise."
        },
        "James Karl Paraico": {
            role: "Member / Designer / Programmer",
            info: "James is a talented designer and programmer from Notre Dame of Marbel University, in his 2nd year of BSIT. He has a knack for bringing ideas to life through his unique design skills and programming abilities."
        },
        "Jasen Suniega": {
            role: "Member / Designer / Thinker",
            info: "Jasen is a creative thinker and designer from Notre Dame of Marbel University, currently in his 2nd year of BSIT. He is always exploring new concepts and pushing the boundaries of design to find innovative solutions."
        },
        "Kent Zeroun": {
            role: "Member / Ideator",
            info: "Kent is an ideator from Notre Dame of Marbel University, in his 2nd year of BSIT"
        }
    };

    const memberDetail = details[memberName];
    document.getElementById("member-name").innerText = memberName;
    document.getElementById("member-role").innerText = memberDetail.role;
    document.getElementById("member-info").innerText = memberDetail.info;
    document.getElementById("member-details").style.display = "block";
}

function closeDetails() {
    document.getElementById("member-details").style.display = "none";
}
